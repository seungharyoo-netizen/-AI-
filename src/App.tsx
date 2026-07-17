import React, { useState } from 'react';
import { 
  Search, 
  BarChart3, 
  Settings, 
  User, 
  Bell, 
  Menu, 
  X,
  LayoutDashboard,
  Zap,
  Activity,
  Layers,
  ShieldAlert,
  Database,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TroubleshootingView } from './components/TroubleshootingView';
import { QualityDashboard } from './components/QualityDashboard';
import { BottleneckAnalysis } from './components/BottleneckAnalysis';
import { SupplyChainRisk } from './components/SupplyChainRisk';
import { ViewType } from './types';

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
    <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#141414] border-r border-white/5 flex flex-col z-50"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-hanwha-orange rounded flex items-center justify-center shrink-0">
            <Cpu className="text-white" size={20} />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <h1 className="font-bold text-sm tracking-tight text-white">NAV-SMART</h1>
              <span className="text-[10px] text-gray-500 font-mono">v1.2.0-PROD</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
                activeView === item.id 
                  ? 'bg-hanwha-orange/10 text-white font-medium' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? item.color : 'text-gray-500'} />
              {isSidebarOpen && <span>{item.label}</span>}
              {activeView === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-hanwha-orange rounded-r-full" 
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#141414]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              INTRANET SECURE NODE: KR-HWS-04
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-hanwha-orange rounded-full border-2 border-[#141414]" />
            </button>
            <div className="h-8 w-[1px] bg-white/5 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-white leading-none">신입사원-H</p>
                <p className="text-[10px] text-gray-500 mt-1">항법장치생산팀</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hanwha-orange to-purple-600 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <footer className="px-8 py-4 border-t border-white/5 bg-[#141414] flex justify-between items-center">
          <div className="flex items-center gap-4 text-[10px] text-gray-600 font-mono">
            <span>© 2026 HANWHA AEROSPACE. ALL RIGHTS RESERVED.</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <ShieldAlert size={12} />
              CLASSIFIED: LEVEL 2
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
            <Database size={12} />
            ERP LATENCY: 24ms
          </div>
        </footer>
      </main>
    </div>
  );
}
