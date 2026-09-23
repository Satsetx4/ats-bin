import React from 'react';
import { motion } from 'framer-motion';
import { tapScale } from '@/lib/motion';
import { sound } from '@/lib/audio';
import { navItems, type TabId } from './navItems';

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav aria-label="Navigasi utama" className="no-print xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const labelMap: Record<TabId, string> = {
            materi: 'Materi',
            lab: 'Lab Teks',
            games: 'Games',
            quiz: 'Kuis',
            worksheet: 'LKS',
          };
          const shortLabel = labelMap[item.id] || item.label;

          return (
            <motion.button
              key={item.id}
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-1 py-1 transition-all relative ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-amber-100/70 dark:bg-amber-950/50 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] leading-tight">{shortLabel}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
