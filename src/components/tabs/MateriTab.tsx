import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/motion';
import { modulesData, flashcardsData } from '@/data/learningData';
import { sound } from '@/lib/audio';
import { ChevronDown, Sparkles, RotateCw, Search, Volume2, VolumeX } from 'lucide-react';

export const MateriTab: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);
  const [flippedCards, setFlippedCards] = useState<Record<string | number, boolean>>({});
  const [speakingModuleId, setSpeakingModuleId] = useState<number | null>(null);
  const [speakingCardId, setSpeakingCardId] = useState<string | number | null>(null);

  const toggleModule = (id: number) => {
    sound.playTap();
    setOpenModuleId(prev => (prev === id ? null : id));
  };

  const flipCard = (id: string | number) => {
    sound.playFlip();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleModuleTts = (e: React.MouseEvent, m: (typeof modulesData)[0]) => {
    e.stopPropagation();
    sound.playTap();
    if (speakingModuleId === m.id) {
      sound.stopSpeech();
      setSpeakingModuleId(null);
    } else {
      sound.stopSpeech();
      setSpeakingCardId(null);
      setSpeakingModuleId(m.id);
      const cleanSummary = m.summary.replace(/<[^>]+>/g, '');
      const textToSpeak = `Modul ${m.id}: ${m.title}. ${cleanSummary}`;
      sound.speakText(
        textToSpeak,
        () => setSpeakingModuleId(m.id),
        () => setSpeakingModuleId(null)
      );
    }
  };

  const handleFlashcardTts = (e: React.MouseEvent, fc: (typeof flashcardsData)[0]) => {
    e.stopPropagation();
    sound.playTap();
    if (speakingCardId === fc.id) {
      sound.stopSpeech();
      setSpeakingCardId(null);
    } else {
      sound.stopSpeech();
      setSpeakingModuleId(null);
      setSpeakingCardId(fc.id);
      sound.speakText(
        `${fc.front}. Artinya: ${fc.back}`,
        () => setSpeakingCardId(fc.id),
        () => setSpeakingCardId(null)
      );
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Banner Modul */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 dark:from-amber-950/70 dark:via-amber-900/50 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-white dark:border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-3 z-10 max-w-xl text-left">
          <div className="inline-flex items-center gap-1.5 bg-amber-900 text-amber-100 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Misi Detektif Membaca</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-amber-950 dark:text-amber-100 leading-tight">
            Ide Pokok & Memahami Isi Bacaan
          </h2>
          <p className="text-amber-900 dark:text-amber-200/90 font-medium text-sm sm:text-base leading-relaxed">
            Membaca dengan teliti membantu kita menemukan ide pokok dan memahami isi bacaan dengan baik! Ayo pelajari 8 rahasia detektif membaca di bawah ini!
          </p>
        </div>

        {/* Vector Mascot Art */}
        <div className="shrink-0 flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-amber-200/60 dark:bg-amber-800/40 border-2 border-amber-300 dark:border-amber-700/50 shadow-inner relative animate-float">
          <div className="text-center">
            <Search className="w-14 h-14 sm:w-16 sm:h-16 text-amber-900 dark:text-amber-300 mx-auto stroke-[2.5]" />
            <span className="text-xs font-black uppercase text-amber-950 dark:text-amber-200 block mt-1 tracking-wider">
              Detektif SD
            </span>
          </div>
        </div>
      </motion.div>

      {/* Akordeon 8 Modul Lengkap */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            8 Konsep Penting
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Klik pada modul untuk membuka rangkuman & trik cerdas
          </p>
        </div>

        <div className="space-y-3">
          {modulesData.map(m => {
            const isOpen = openModuleId === m.id;
            return (
              <div
                key={m.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleModule(m.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg shrink-0 shadow-inner">
                      {m.id}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {m.badge}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mt-0.5">
                        {m.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleModuleTts(e, m)}
                      className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                        speakingModuleId === m.id
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900'
                      }`}
                      title={speakingModuleId === m.id ? 'Hentikan Suara' : 'Dengarkan Ringkasan'}
                    >
                      {speakingModuleId === m.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline text-[11px]">{speakingModuleId === m.id ? 'Stop' : 'Suara'}</span>
                    </button>

                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 sm:px-6 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl mb-3 text-sm text-slate-700 dark:text-slate-300 font-medium italic border border-slate-100 dark:border-slate-700/60">
                        "{m.summary}"
                      </div>
                      <div
                        className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: m.detailsHtml }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Flashcard 3D Cara Cepat Mengingat (Simetris 6 Kartu: 2 baris x 3 kolom) */}
      <motion.div variants={itemVariants} className="pt-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-800 shadow-sm">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full inline-block">
              Kartu Pintar Interaktif
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5">
              Cara Cepat Mengingat
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Klik kartu untuk membalikkan dan membaca intisari pentingnya!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcardsData.map(fc => {
              const isFlipped = flippedCards[fc.id] || false;
              return (
                <div
                  key={fc.id}
                  onClick={() => flipCard(fc.id)}
                  className="perspective-1000 cursor-pointer h-52 sm:h-56 group select-none"
                >
                  <div
                    className={`relative w-full h-full transform-style-3d rounded-2xl transition-transform duration-500 shadow-md group-hover:shadow-lg ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Side */}
                    <div
                      className={`absolute inset-0 w-full h-full bg-gradient-to-br ${fc.color} text-white rounded-2xl p-5 flex flex-col items-center justify-between backface-hidden border-2 border-white/30 shadow-inner`}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-black/20 px-3 py-0.5 rounded-full">
                        Klik untuk Membuka
                      </span>
                      <div className="text-center my-auto">
                        <span className="text-4xl block mb-2">{fc.icon}</span>
                        <h4 className="text-xl sm:text-2xl font-black tracking-wide">
                          {fc.front}
                        </h4>
                      </div>
                      <span className="text-xs opacity-90 flex items-center gap-1.5 font-medium">
                        <RotateCw className="w-3.5 h-3.5" /> Putar Kartu
                      </span>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-5 flex flex-col items-center justify-between rotate-y-180 backface-hidden border-2 border-amber-300 dark:border-amber-500/50 shadow-md">
                      <div className="flex items-center justify-between w-full border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                          Arti & Penjelasan
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {fc.front}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleFlashcardTts(e, fc)}
                            className={`p-1 rounded-md transition-all ${
                              speakingCardId === fc.id
                                ? 'bg-rose-500 text-white animate-pulse'
                                : 'text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-slate-700'
                            }`}
                            title={speakingCardId === fc.id ? 'Hentikan Suara' : 'Dengarkan Arti'}
                          >
                            {speakingCardId === fc.id ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-center text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium my-auto px-1 leading-snug">
                        {fc.back}
                      </p>
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                        Klik untuk membalikkan kembali
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
