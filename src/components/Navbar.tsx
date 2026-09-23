import React from 'react';
import { motion } from 'framer-motion';
import { tapScale } from '@/lib/motion';
import { sound } from '@/lib/audio';
import { type ThemeMode } from '@/lib/storage';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  Search
} from 'lucide-react';
import { navItems, type TabId } from './navItems';

export type { TabId } from './navItems';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onRequestReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  isMuted,
  onToggleSound,
  onRequestReset,
}) => {
  return (
    <header className="no-print safe-area-top sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/80 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-6xl mx-auto px-2 min-[361px]:px-4 sm:px-6 py-2.5 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Brand & Identity */}
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-13 sm:h-13 shrink-0 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center text-amber-950 shadow-md border-2 border-white dark:border-slate-700 animate-float">
            <Search className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <span className="hidden min-[421px]:inline-block text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
              Bahasa Indonesia • Kelas 3 SD
            </span>
            <h1 className="max-w-[112px] min-[361px]:max-w-[150px] sm:max-w-none truncate text-sm sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
              Detektif Cilik Membaca
            </h1>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Sound Toggle */}
          <motion.button
            whileTap={tapScale}
            onClick={() => {
              sound.playTap();
              onToggleSound();
            }}
            className={`w-11 h-11 rounded-xl border transition-all shadow-sm flex items-center justify-center ${
              isMuted
                ? 'bg-rose-100 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-pressed={isMuted}
            aria-label={isMuted ? 'Suara dimatikan, nyalakan suara' : 'Suara aktif, matikan suara'}
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileTap={tapScale}
            onClick={() => {
              sound.playTap();
              onToggleTheme();
            }}
            className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm transition-all flex items-center justify-center"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Mode gelap aktif, alihkan tema' : 'Mode terang aktif, alihkan tema'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-600" />
            )}
          </motion.button>

          {/* Reset Progress Button */}
          <motion.button
            whileTap={tapScale}
            onClick={() => {
              sound.playTap();
              onRequestReset();
            }}
            className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 shadow-sm transition-all flex items-center justify-center"
            title="Reset Data & Mulai dari Awal"
            aria-label="Reset data aplikasi"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </motion.button>
        </div>
      </div>

      {/* Wide desktop navigation; smaller screens use the bottom navigation. */}
      <nav aria-label="Navigasi tab" className="hidden xl:flex max-w-6xl mx-auto px-4 sm:px-6 py-1.5 gap-2 border-t border-slate-100 dark:border-slate-800">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                onSelectTab(item.id);
              }}
              className={`min-h-11 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 relative ${
                isActive
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-102 font-extrabold'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-amber-100/70 dark:hover:bg-slate-700'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </header>
  );
};
