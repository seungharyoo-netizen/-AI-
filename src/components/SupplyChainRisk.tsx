import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  RefreshCw, 
  Package, 
  ExternalLink,
  ChevronRight,
  Search,
  Cpu
} from 'lucide-react';
import { SupplyChainItem } from '../types';

export const SupplyChainRisk: React.FC = () => {
  const [data, setData] = useState<SupplyChainItem[]>([]);

  useEffect(() => {
    fetch('/api/supply-chain')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">단종 리스크 관리 (Supply Chain Matrix)</h2>
          <p className="text-gray-400 text-sm mt-1">BOM 내 부품별 수급 현황 및 단종 리스크를 선제적으로 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <RefreshCw size={14} />
            데이터 갱신
          </button>
          <button className="bg-hanwha-orange hover:bg-hanwha-orange/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            보고서 출력
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">Critical Risks</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-red-500">12</h3>
            <ShieldAlert className="text-red-500" size={32} />
          </div>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">Replacement Pending</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-yellow-500">24</h3>
            <RefreshCw className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">Verified BOMs</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-green-500">92%</h3>
            <Package className="text-green-500" size={32} />
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-sm">부품 단종 리스크 현황 (Part Obsolescence Status)</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="부품번호 검색..."
              className="bg-[#0f0f0f] border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-hanwha-orange/50 transition-all"
            />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#0f0f0f] border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Part Number</th>
              <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Risk Level</th>
              <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">End of Life</th>
              <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Replacement Parts</th>
              <th className="px-6 py-4 text-xs font-mono text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center">
                      <Cpu size={16} className="text-gray-400" />
                    </div>
                    <span className="font-mono font-medium">{item.part}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    item.status === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    item.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                    'bg-green-500/10 text-green-500 border border-green-500/20'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-400">{item.endOfLife}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {item.replacements.length > 0 ? item.replacements.map((rep, j) => (
                      <span key={j} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {rep}
                      </span>
                    )) : <span className="text-[10px] text-gray-600">NONE</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-500 hover:text-hanwha-orange transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <RefreshCw size={16} className="text-hanwha-orange" />
            최근 기술 변경점 (Engineering Changes)
          </h4>
          <div className="space-y-4">
            {[
              { id: 'ECR-2405', desc: '자이로 모듈 고온 환경 내구성 개선을 위한 커패시터 변경', date: '2026-07-12' },
              { id: 'ECR-2401', desc: '메인보드 전원 노이즈 저감을 위한 필터링 설계 변경', date: '2026-07-08' },
            ].map((ec, i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group">
                <div className="shrink-0 font-mono text-xs text-hanwha-orange bg-hanwha-orange/10 px-2 py-1 rounded h-fit">
                  {ec.id}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{ec.desc}</p>
                  <p className="text-[10px] text-gray-500 font-mono">{ec.date}</p>
                </div>
                <ChevronRight className="ml-auto text-gray-600 group-hover:text-hanwha-orange transition-colors" size={16} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 bg-gradient-to-br from-hanwha-orange/10 to-transparent">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <ShieldAlert size={16} className="text-hanwha-orange" />
            단종 부품 선확보 알림
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            'Chipset X-9'의 단종 일정이 3개월 앞당겨졌습니다. 현재 재고량은 14일 생산분이며, 즉시 5,000개 추가 구매 승인이 필요합니다.
          </p>
          <button className="w-full bg-hanwha-orange py-3 rounded-xl font-bold hover:bg-hanwha-orange/90 transition-all">
            구매팀 긴급 요청 발송
          </button>
        </div>
      </div>
    </div>
  );
};
