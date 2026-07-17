import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { Activity, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DefectRate } from '../types';

export const QualityDashboard: React.FC = () => {
  const [data, setData] = useState<DefectRate[]>([]);

  useEffect(() => {
    fetch('/api/defects')
      .then(res => res.json())
      .then(setData);
  }, []);

  const latest = data[data.length - 1];
  const isTargetMet = latest ? latest.rate <= latest.target : true;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">품질 대시보드 (Quality Dashboard)</h2>
          <p className="text-gray-400 text-sm mt-1">실시간 불량률 추이 및 품질 목표 달성 현황을 모니터링합니다.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
          <span className="text-xs font-mono text-gray-500 uppercase">Current Status</span>
          <div className="flex items-center gap-2 font-bold">
            {isTargetMet ? (
              <>
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-green-500">OPTIMAL</span>
              </>
            ) : (
              <>
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-red-500">WARNING</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 border-b-4 border-b-hanwha-orange">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">Daily Defect Rate</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">{latest?.rate}%</h3>
            <span className={`text-xs ${isTargetMet ? 'text-green-500' : 'text-red-500'}`}>
              Target: {latest?.target}%
            </span>
          </div>
        </div>
        <div className="glass-panel p-6 border-b-4 border-b-blue-500">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">Weekly Average</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">1.8%</h3>
            <span className="text-xs text-green-500">-0.2% vs Prev</span>
          </div>
        </div>
        <div className="glass-panel p-6 border-b-4 border-b-purple-500">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">Total Units (MTD)</p>
          <h3 className="text-3xl font-bold">1,240</h3>
        </div>
        <div className="glass-panel p-6 border-b-4 border-b-emerald-500">
          <p className="text-xs font-mono text-gray-500 uppercase mb-2">First Pass Yield</p>
          <h3 className="text-3xl font-bold">98.2%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Activity size={18} className="text-hanwha-orange" />
            불량률 추이 (Defect Rate Trend)
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff6b00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => val.split('-').slice(1).join('/')}
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  unit="%" 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#ff6b00" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                />
                <Line 
                  type="step" 
                  dataKey="target" 
                  stroke="#666" 
                  strokeDasharray="5 5" 
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <TrendingDown size={18} className="text-hanwha-orange" />
            주요 불량 사유 (Pareto Analysis)
          </h3>
          <div className="space-y-6">
            {[
              { label: '납땜 불량 (Soldering)', count: 42, color: 'bg-hanwha-orange' },
              { label: '부품 실장 오류 (Placement)', count: 28, color: 'bg-blue-500' },
              { label: '커넥터 접촉 불량 (Connection)', count: 15, color: 'bg-purple-500' },
              { label: '기타 (Others)', count: 15, color: 'bg-gray-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-mono text-gray-500">{item.count}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full`} 
                    style={{ width: `${item.count}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
            <p className="text-xs text-gray-400 leading-relaxed italic">
              "최근 3일간 납땜 불량이 증가하는 추세입니다. 제2공정의 히터 온도를 재점검할 것을 권장합니다."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
