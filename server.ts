import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // Mock Database
  const mockTroubleshooting = [
    { code: "E-102", part: "Gyro Sensor A-1", cause: "Signal Noise", repair: "RC-05 (Shielding)", probability: 85 },
    { code: "E-102", part: "Gyro Sensor A-1", cause: "Calibration Drift", repair: "RC-12 (Recalibration)", probability: 12 },
    { code: "E-205", part: "Power Board P-2", cause: "Capacitor Leak", repair: "RC-88 (Replacement)", probability: 92 },
    { code: "E-310", part: "Logic Module L-7", cause: "Firmware Mismatch", repair: "RC-21 (Update)", probability: 78 },
  ];

  const mockDefectRates = [
    { date: "2026-07-10", rate: 2.1, target: 1.5 },
    { date: "2026-07-11", rate: 1.8, target: 1.5 },
    { date: "2026-07-12", rate: 2.4, target: 1.5 },
    { date: "2026-07-13", rate: 1.6, target: 1.5 },
    { date: "2026-07-14", rate: 1.4, target: 1.5 },
    { date: "2026-07-15", rate: 1.9, target: 1.5 },
    { date: "2026-07-16", rate: 2.2, target: 1.5 },
  ];

  const mockBottlenecks = [
    { process: "Assembly", time: 45, standard: 40 },
    { process: "Calibration", time: 120, standard: 90 },
    { process: "Final Test", time: 60, standard: 55 },
    { process: "Packaging", time: 20, standard: 25 },
  ];

  const mockSupplyChain = [
    { part: "Chipset X-9", status: "Critical", endOfLife: "2026-12", replacements: ["X-10", "X-11"] },
    { part: "Sensor S-3", status: "Warning", endOfLife: "2027-06", replacements: ["S-4"] },
    { part: "Connector C-5", status: "Stable", endOfLife: "N/A", replacements: [] },
  ];

  // API Routes
  app.get("/api/troubleshoot", (req, res) => {
    const { code } = req.query;
    if (code) {
      const results = mockTroubleshooting.filter(item => item.code === code);
      res.json(results);
    } else {
      res.json(mockTroubleshooting);
    }
  });

  app.get("/api/defects", (req, res) => {
    res.json(mockDefectRates);
  });

  app.get("/api/bottlenecks", (req, res) => {
    res.json(mockBottlenecks);
  });

  app.get("/api/supply-chain", (req, res) => {
    res.json(mockSupplyChain);
  });

  app.post("/api/ai/analyze", async (req, res) => {
    const { prompt } = req.body;
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an expert production engineer at Hanwha Aerospace. Analyze this production query based on the following context: 항법 장치 생산 공정, ERP 데이터 분석, 방산 보안 준수. Query: ${prompt}`,
      });
      res.json({ analysis: result.text });
    } catch (error) {
      console.error("AI Analysis Error:", error);
      res.status(500).json({ error: "Failed to perform AI analysis" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
