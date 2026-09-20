import React, { useState, useEffect } from 'react';
import { Navbar, type TabId } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { DetectiveModal, type ModalProps } from '@/components/DetectiveModal';
import { MateriTab } from '@/components/tabs/MateriTab';
import { LabTab } from '@/components/tabs/LabTab';
import { GamesTab } from '@/components/tabs/GamesTab';
import { QuizTab } from '@/components/tabs/QuizTab';
import { WorksheetTab } from '@/components/tabs/WorksheetTab';
import { safeStorage, getInitialTheme, applyTheme, type ThemeMode } from '@/lib/storage';
import { sound } from '@/lib/audio';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeTab, setActiveTab] = useState<TabId>(() => safeStorage.get<TabId>('ats_active_tab', 'materi'));
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.muted);

  // Modal State
  const [modalConfig, setModalConfig] = useState<ModalProps>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {},
  });

  // Apply theme class to <html>
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Save active tab
  useEffect(() => {
    safeStorage.set('ats_active_tab', activeTab);
  }, [activeTab]);

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectTab = (tab: TabId) => {
    sound.stopSpeech();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showModal = (
    title: string,
    message: string,
    type: 'info' | 'alert' | 'success' | 'confirm' = 'info',
    confirmText = 'Mengerti 👍',
    cancelText?: string,
    onConfirmCallback?: () => void
  ) => {
    setModalConfig({
      isOpen: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm: () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
        if (onConfirmCallback) onConfirmCallback();
      },
      onCancel: cancelText
        ? () => {
            setModalConfig(prev => ({ ...prev, isOpen: false }));
          }
        : undefined,
    });
  };

  const handleRequestReset = () => {
    showModal(
      'Mulai dari Awal?',
      'Apakah kamu ingin mengosongkan riwayat belajar dan memulai kembali dari awal? Preferensi audio dan tema akan diatur ulang.',
      'confirm',
      'Ya, Reset Semua!',
      'Batal',
      () => {
        safeStorage.clearAll();
        setActiveTab('materi');
        window.location.reload();
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 flex flex-col antialiased transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onRequestReset={handleRequestReset}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 sm:p-6 pb-20 sm:pb-8">
        {activeTab === 'materi' && <MateriTab />}
        {activeTab === 'lab' && <LabTab />}
        {activeTab === 'games' && <GamesTab onShowModal={showModal} />}
        {activeTab === 'quiz' && <QuizTab onShowModal={showModal} />}
        {activeTab === 'worksheet' && <WorksheetTab />}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 space-y-1.5">
          <p className="font-bold text-slate-700 dark:text-slate-300">
            Materi Interaktif Bahasa Indonesia Kelas 3 SD • Kurikulum Merdeka
          </p>
          <p>
            Dibuat dengan penuh semangat belajar untuk calon detektif cilik Indonesia 🌟
          </p>
          <div className="pt-2">
            <button
              onClick={handleRequestReset}
              className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold"
            >
              Reset Data / Mulai dari Awal
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile-First Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Detective Cartoon Modal */}
      <DetectiveModal {...modalConfig} />
    </div>
  );
};
