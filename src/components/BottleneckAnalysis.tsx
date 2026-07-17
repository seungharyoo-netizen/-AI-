import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine
} from 'recharts';
import { Clock, AlertTriangle, Layers, Zap } from 'lucide-react';
import { Bottleneck } from '../types';

export const BottleneckAnalysis: React.FC = () => {
  const [data, setData] = useState<Bottleneck[]>([]);

  useEffect(() => {
    fetch('/api/bottlenecks')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">병목 공정 분석 (Bottleneck Detector)</h2>
          <p className="text-gray-400 text-sm mt-1">공정별 실시간 소요 시간을 분석하여 생산 흐름 정체 구간을 식별합니다.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Clock size={14} className="text-hanwha-orange" />
          REAL-TIME TIMESTAMP SYNCED
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="font-bold mb-8 flex items-center gap-2">
            <Layers size={18} className="text-hanwha-orange" />
            공정별 소요 시간 vs 표준 (Actual vs Standard)
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={12} unit="min" />
                <YAxis dataKey="process" type="category" stroke="#666" fontSize={12} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="time" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.time > entry.standard ? '#ff6b00' : '#4ade80'} 
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
                <Bar dataKey="standard" fill="#333" radius={[0, 4, 4, 0]} barSize={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-xs font-mono justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-hanwha-orange" />
              <span>OVER STANDARD</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500" />
              <span>OPTIMAL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[#333]" />
              <span>STANDARD LINE</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 border-l-4 border-l-hanwha-orange bg-hanwha-orange/5">
            <div className="flex items-center gap-2 text-hanwha-orange mb-4">
              <AlertTriangle size={20} />
              <h3 className="font-bold">병목 경고 (Critical Bottleneck)</h3>
            </div>
            <p className="text-xl font-bold mb-2">교정 공정 (Calibration)</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              표준 시간(90분) 대비 33% 초과 발생 중입니다. 최근 투입된 신규 장비의 셋업 이슈로 판단됩니다.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-hanwha-orange">
              <Zap size={14} />
              ACTION RECOMMENDED: 장비 3호기 센서 점검
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-bold mb-4">생산 가동률 (Efficiency)</h3>
            <div className="flex items-center justify-center py-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64" cy="64" r="58"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64" cy="64" r="58"
                    fill="transparent"
                    stroke="#ff6b00"
                    strokeWidth="8"
                    strokeDasharray={364}
                    strokeDashoffset={364 * (1 - 0.74)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">74%</span>
                  <span className="text-[10px] text-gray-500 uppercase">Overall</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Target Efficiency</span>
                <span className="font-mono">85%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Loss Time (Today)</span>
                <span className="font-mono text-red-400">145 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
