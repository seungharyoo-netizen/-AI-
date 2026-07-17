import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  User, 
  Bell, 
  Menu, 
  X,
  Activity,
  Layers,
  ShieldAlert,
  Database,
  Cpu,
  Clock as ClockIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TroubleshootingView } from './components/TroubleshootingView';
import { QualityDashboard } from './components/QualityDashboard';
import { BottleneckAnalysis } from './components/BottleneckAnalysis';
import { SupplyChainRisk } from './components/SupplyChainRisk';
import { ViewType } from './types';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <div className="flex flex-col items-end">
        <span className="text-gray-400">SERVER TIME</span>
        <span className="text-white font-bold">{time.toLocaleTimeString([], { hour12: false })}</span>
      </div>
      <div className="h-6 w-[1px] bg-white/10" />
      <div className="flex flex-col items-end">
        <span className="text-gray-400">UPTIME</span>
        <span className="text-emerald-500 font-bold">142:04:12</span>
      </div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('troubleshooting');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'troubleshooting', label: '고장탐구 매칭', icon: Search, color: 'text-blue-500' },
    { id: 'quality', label: '품질 대시보드', icon: Activity, color: 'text-emerald-500' },
    { id: 'bottleneck', label: '병목 공정 분석', icon: Layers, color: 'text-hanwha-orange' },
    { id: 'supply-chain', label: '단종 리스크', icon: ShieldAlert, color: 'text-red-500' },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'troubleshooting': return <TroubleshootingView />;
      case 'quality': return <QualityDashboard />;
      case 'bottleneck': return <BottleneckAnalysis />;
      case 'supply-chain': return <SupplyChainRisk />;
      default: return <TroubleshootingView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden relative">
      <div className="scanline" />
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#0f0f0f] border-r border-white/5 flex flex-col z-50 shadow-2xl"
      >
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-hanwha-orange rounded flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
            <Cpu className="text-white" size={24} />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <h1 className="font-black text-lg tracking-tighter text-white leading-none">HANWHA</h1>
              <span className="text-[10px] text-hanwha-orange font-bold tracking-widest mt-0.5">AEROSPACE</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group overflow-hidden ${
                activeView === item.id 
                  ? 'nav-active' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? item.color : 'text-gray-500'} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              {activeView === item.id && (
                <motion.div 
                  layoutId="active-highlight"
                  className="absolute inset-0 bg-hanwha-orange/5 -z-10" 
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-colors border border-white/5"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">LIVE</span>
              <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                <Database size={14} className="text-hanwha-orange" />
                ERP NODE: KR-SEOUL-PROD-01
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <Clock />
            
            <div className="flex items-center gap-6">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-hanwha-orange rounded-full border-2 border-[#0f0f0f]" />
              </button>
              
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-none">신입사원-H</p>
                  <p className="text-[10px] text-hanwha-orange font-bold mt-1.5">NAV-PROD TEAM</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#222] to-[#111] border border-white/10 flex items-center justify-center overflow-hidden">
                  <User size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="max-w-[1400px] mx-auto">
                {renderView()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <footer className="px-10 py-5 border-t border-white/10 bg-[#0f0f0f] flex justify-between items-center text-[10px] font-mono">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="tracking-widest">© 2026 HANWHA AEROSPACE. ALL RIGHTS RESERVED.</span>
            <span className="flex items-center gap-1.5 text-hanwha-orange font-bold">
              <ShieldAlert size={12} />
              SYSTEM CLASSIFIED: LEVEL 02 (RESTRICTED)
            </span>
          </div>
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              ENCRYPTED CONNECTION
            </div>
            <div className="text-gray-400">
              BUILD: <span className="text-white">v1.2.0-STABLE</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
