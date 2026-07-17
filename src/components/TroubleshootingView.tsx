import React, { useState, useEffect } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  ArrowRight, 
  ChevronRight,
  Database,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { TroubleshootingItem } from '../types';

export const TroubleshootingView: React.FC = () => {
  const [searchCode, setSearchCode] = useState('');
  const [results, setResults] = useState<TroubleshootingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const fetchResults = async (code: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/troubleshoot?code=${code}`);
      const data = await res.json();
      setResults(data);
      
      if (data.length > 0) {
        // Simple mock AI trigger for demo
        const aiRes = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: `Provide a detailed engineering commentary for error code ${code} affecting ${data[0].part}.` })
        });
        const aiData = await aiRes.json();
        setAiAnalysis(aiData.analysis);
      } else {
        setAiAnalysis(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode) fetchResults(searchCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">고장탐구 (Troubleshooting)</h2>
          <p className="text-gray-400 text-sm mt-1">에러 코드를 기반으로 과거 정비 이력 및 해결책을 매칭합니다.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Database size={14} className="text-hanwha-orange" />
          ERP SYSTEM CONNECTED
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
          type="text" 
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
          placeholder="에러 코드를 입력하세요 (예: E-102)"
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-hanwha-orange/50 transition-all font-mono text-lg"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-hanwha-orange hover:bg-hanwha-orange/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          분석 실행
        </button>
      </form>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Zap className="animate-pulse text-hanwha-orange" size={48} />
          <p className="text-gray-400 animate-pulse">ERP 데이터 및 AI 분석 엔진 가동 중...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Part</th>
                    <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Root Cause</th>
                    <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Repair Code</th>
                    <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {results.map((res, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium">{res.part}</td>
                      <td className="px-6 py-4 text-gray-300">{res.cause}</td>
                      <td className="px-6 py-4 font-mono text-hanwha-orange">{res.repair}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-hanwha-orange rounded-full" 
                              style={{ width: `${res.probability}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono">{res.probability}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {aiAnalysis && (
              <div className="glass-panel p-6 border-l-4 border-l-hanwha-orange bg-hanwha-orange/5">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="text-hanwha-orange" size={20} />
                  <h3 className="font-bold text-lg">AI Engineering Insight</h3>
                </div>
                <div className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                  {aiAnalysis}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-yellow-500" />
                주의 사항 (Safety Protocol)
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-hanwha-orange shrink-0" />
                  항법 장치 내부 전원 차단 여부를 반드시 확인하십시오.
                </li>
                <li className="flex gap-2">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-hanwha-orange shrink-0" />
                  정전기 방지(ESD) 보호 장구를 착용 후 작업을 시작하십시오.
                </li>
                <li className="flex gap-2">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-hanwha-orange shrink-0" />
                  교체된 부품은 품질 관리팀으로 이송하여 정밀 분석을 의뢰하십시오.
                </li>
              </ul>
            </div>
            
            <div className="glass-panel p-6 bg-blue-500/5 border-l-4 border-l-blue-500">
              <h3 className="font-bold mb-2 flex items-center gap-2 text-blue-400">
                <ShieldCheck size={18} />
                보안 가이드
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                해당 분석 데이터는 대외비(Confidential)로 분류됩니다. 
                외부망으로의 유출이 엄격히 금지되며, 작업 이력은 개인 사번으로 로그에 기록됩니다.
              </p>
            </div>
          </div>
        </div>
      ) : searchCode && !loading ? (
        <div className="text-center py-20 glass-panel">
          <Info className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400">해당 코드에 대한 매칭 결과가 없습니다. ERP 데이터베이스를 다시 확인하거나 관리자에게 문의하십시오.</p>
        </div>
      ) : (
        <div className="text-center py-32 opacity-20">
          <Database className="mx-auto mb-6" size={80} />
          <p className="text-xl font-medium">검색어를 입력하여 생산 지원 엔진을 가동하십시오</p>
        </div>
      )}
    </div>
  );
};
