import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants, tapScale } from '@/lib/motion';
import { miniGamesData, type GamePilahItem, type Game5W1HItem } from '@/data/learningData';
import { sound } from '@/lib/audio';
import { shuffle } from '@/lib/exam';
import { useReducedMotion } from 'framer-motion';
import { restoreGameProgress } from '@/lib/learningProgress';
import { safeStorage, STORAGE_KEYS } from '@/lib/storage';
import confetti from 'canvas-confetti';
import { RotateCcw, Star, MessageSquare } from 'lucide-react';

interface GamesTabProps {
  onShowModal: (title: string, message: string, type?: 'info' | 'alert' | 'success') => void;
}

export const GamesTab: React.FC<GamesTabProps> = ({ onShowModal }) => {
  const prefersReducedMotion = useReducedMotion();
  const [initialProgress] = useState(() => restoreGameProgress(
    safeStorage.get<unknown>(STORAGE_KEYS.gameProgress, null),
    miniGamesData.pilahKalimat.length,
    miniGamesData.pasangKataTanya,
  ));
  const targetByWord = new Map(miniGamesData.pasangKataTanya.map(item => [item.qWord, item]));

  // Game 1 State
  const [pilahIndex, setPilahIndex] = useState<number>(initialProgress.pilahIndex);
  const [pilahScore, setPilahScore] = useState<number>(initialProgress.pilahScore);
  const [pilahFeedback, setPilahFeedback] = useState<{ isCorrect: boolean; reason: string } | null>(null);
  const [isPilahDone, setIsPilahDone] = useState<boolean>(initialProgress.isPilahDone);
  const [pendingPilahAdvance, setPendingPilahAdvance] = useState(initialProgress.pendingPilahAdvance);
  const pilahTransitionTimer = useRef<number | null>(null);
  const wrongTargetTimer = useRef<number | null>(null);

  // Game 2 State
  const [selectedWord, setSelectedWord] = useState<string | null>(initialProgress.selectedWord);
  const [matchedPairs, setMatchedPairs] = useState<string[]>(initialProgress.matchedPairs);
  const [shuffledTargets, setShuffledTargets] = useState<Game5W1HItem[]>(() => initialProgress.shuffledQuestionWords.flatMap(word => {
    const item = targetByWord.get(word);
    return item ? [item] : [];
  }));
  const [wrongTargetWord, setWrongTargetWord] = useState<string | null>(null);
  const [isGame2Done, setIsGame2Done] = useState<boolean>(initialProgress.isGame2Done);

  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.gameProgress, {
      version: 1,
      pilahIndex,
      pilahScore,
      isPilahDone,
      pendingPilahAdvance,
      selectedWord,
      matchedPairs,
      shuffledQuestionWords: shuffledTargets.map(item => item.qWord),
      isGame2Done,
    });
  }, [isPilahDone, isGame2Done, matchedPairs, pendingPilahAdvance, pilahFeedback, pilahIndex, pilahScore, selectedWord, shuffledTargets]);

  useEffect(() => () => {
    if (pilahTransitionTimer.current !== null) window.clearTimeout(pilahTransitionTimer.current);
    if (wrongTargetTimer.current !== null) window.clearTimeout(wrongTargetTimer.current);
  }, []);

  const resetGame2 = () => {
    if (wrongTargetTimer.current !== null) window.clearTimeout(wrongTargetTimer.current);
    wrongTargetTimer.current = null;
    setSelectedWord(null);
    setMatchedPairs([]);
    setIsGame2Done(false);
    setWrongTargetWord(null);
    const shuffled = shuffle(miniGamesData.pasangKataTanya);
    setShuffledTargets(shuffled);
  };

  const handlePilahAnswer = (type: 'utama' | 'penjelas') => {
    if (pilahFeedback || isPilahDone) return; // Prevent double click during feedback

    const currentQ: GamePilahItem = miniGamesData.pilahKalimat[pilahIndex];
    const isCorrect = currentQ.type === type;

    if (isCorrect) {
      sound.playSuccess();
      setPilahScore(prev => prev + 1);
      setPilahFeedback({
        isCorrect: true,
        reason: currentQ.reason,
      });
    } else {
      sound.playWrong();
      setPilahFeedback({
        isCorrect: false,
        reason: `Jawaban yang benar adalah Kalimat ${currentQ.type === 'utama' ? 'Utama' : 'Penjelas'}. ${currentQ.reason}`,
      });
    }

    setPendingPilahAdvance(true);
    pilahTransitionTimer.current = window.setTimeout(() => {
      pilahTransitionTimer.current = null;
      setPendingPilahAdvance(false);
      setPilahFeedback(null);
      if (pilahIndex + 1 >= miniGamesData.pilahKalimat.length) {
        setIsPilahDone(true);
        sound.playFanfare();
        if (!prefersReducedMotion) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setPilahIndex(prev => prev + 1);
      }
    }, 1800);
  };

  const resetGame1 = () => {
    sound.playTap();
    if (pilahTransitionTimer.current !== null) window.clearTimeout(pilahTransitionTimer.current);
    pilahTransitionTimer.current = null;
    setPilahIndex(0);
    setPilahScore(0);
    setPilahFeedback(null);
    setIsPilahDone(false);
    setPendingPilahAdvance(false);
  };

  // Game 2 logic
  const handleSelectWord = (word: string) => {
    if (matchedPairs.includes(word)) return;
    sound.playTap();
    setSelectedWord(word);
  };

  const handleSelectTarget = (target: Game5W1HItem) => {
    if (matchedPairs.includes(target.qWord)) return;

    if (!selectedWord) {
      // Replaces native alert() with DetectiveModal!
      sound.playWrong();
      onShowModal(
        'Pilih Kata Tanya Terlebih Dahulu!',
        'Silakan klik salah satu kata tanya di sebelah kiri (misalnya: Apa, Siapa, Kapan) sebelum memilih fungsinya di sebelah kanan! 🕵️',
        'alert'
      );
      return;
    }

    if (target.qWord === selectedWord) {
      // Matched!
      sound.playSuccess();
      const updated = [...matchedPairs, selectedWord];
      setMatchedPairs(updated);
      setSelectedWord(null);

      if (updated.length === miniGamesData.pasangKataTanya.length) {
        setIsGame2Done(true);
        sound.playFanfare();
        if (!prefersReducedMotion) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      // Wrong Match
      sound.playWrong();
      setWrongTargetWord(target.qWord);
      if (wrongTargetTimer.current !== null) window.clearTimeout(wrongTargetTimer.current);
      wrongTargetTimer.current = window.setTimeout(() => {
        wrongTargetTimer.current = null;
        setWrongTargetWord(null);
      }, 700);
    }
  };

  const currentPilahQ = miniGamesData.pilahKalimat[pilahIndex];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Games */}
      <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full inline-block">
          Gamifikasi Edukasi
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1.5">
          Taman Bermain Detektif Cilik
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
          Uji ketajaman intuisimu dengan bermain game seru pemilahan kalimat dan penghubung kata tanya!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* ================= GAME 1: PILAH KALIMAT ================= */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                  Game 1
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Pilah Kalimat
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Skor Kamu:</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {pilahScore} / {miniGamesData.pilahKalimat.length}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>{isPilahDone ? 'Selesai!' : `Soal ${pilahIndex + 1} dari ${miniGamesData.pilahKalimat.length}`}</span>
              <span>Pilih jenis kalimat yang tepat</span>
            </div>

            {/* Area Kartu Kalimat */}
            {!isPilahDone ? (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-slate-800/60 p-5 sm:p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800/50 min-h-[140px] mb-4 shadow-inner space-y-3">
                {currentPilahQ?.context && (
                  <div className="text-left">
                    <span className="block text-[11px] uppercase tracking-wide font-extrabold text-amber-800 dark:text-amber-300 mb-1">
                      Konteks paragraf
                    </span>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {(() => {
                        const [before, ...after] = currentPilahQ.context.split(currentPilahQ.sentence);
                        return after.length > 0 ? (
                          <>{before}<mark className="rounded bg-amber-200 dark:bg-amber-700 px-0.5">{currentPilahQ.sentence}</mark>{after.join(currentPilahQ.sentence)}</>
                        ) : currentPilahQ.context;
                      })()}
                    </p>
                  </div>
                )}
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed text-center">
                  Kalimat yang dinilai: “{currentPilahQ?.sentence}”
                </p>
              </div>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 p-6 rounded-2xl text-center space-y-2 mb-4">
                <span className="text-4xl block">🏆</span>
                <h4 className="text-xl font-black text-emerald-900 dark:text-emerald-200">
                  Luar Biasa, Detektif Hebat!
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Kamu menjawab benar{' '}
                  <strong className="text-emerald-600 dark:text-emerald-400">{pilahScore} dari {miniGamesData.pilahKalimat.length} kalimat</strong>.
                </p>
              </div>
            )}

            {/* Feedback Box */}
            <AnimatePresence>
              {pilahFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-xl text-sm font-medium border mb-4 text-left ${
                    pilahFeedback.isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{pilahFeedback.isCorrect ? '🎉' : '💡'}</span>
                    <strong>{pilahFeedback.isCorrect ? 'Benar Sekali!' : 'Kurang Tepat!'}</strong>
                  </div>
                  <p className="text-xs sm:text-sm">{pilahFeedback.reason}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tombol Aksi */}
          <div>
            {!isPilahDone ? (
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={tapScale}
                  disabled={pilahFeedback !== null}
                  onClick={() => handlePilahAnswer('utama')}
                  className="p-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-xl shadow-md transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50"
                >
                  <Star className="w-5 h-5 fill-current" />
                  <span>Kalimat Utama</span>
                </motion.button>

                <motion.button
                  whileTap={tapScale}
                  disabled={pilahFeedback !== null}
                  onClick={() => handlePilahAnswer('penjelas')}
                  className="p-3.5 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-xl shadow-md transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Kalimat Penjelas</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileTap={tapScale}
                onClick={resetGame1}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl shadow-md transition-all flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" /> Main Lagi
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* ================= GAME 2: PASANGKAN 5W1H ================= */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-purple-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full">
                  Game 2
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Pasangkan ADiKSiMBa (5W1H)
                </h3>
              </div>
              <motion.button
                whileTap={tapScale}
                onClick={() => {
                  sound.playTap();
                  resetGame2();
                }}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 font-bold flex items-center gap-1 p-1 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/50"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </motion.button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 text-left">
              <strong>Cara Main:</strong> Klik 1 kata tanya di sebelah kiri, lalu klik kotak penjelasan fungsi yang cocok di sebelah kanan!
            </p>

            {/* Area Permainan Pasangkan */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Kolom Kiri: Kata Tanya */}
              <div className="space-y-2">
                {miniGamesData.pasangKataTanya.map(w => {
                  const isMatched = matchedPairs.includes(w.qWord);
                  const isSelected = selectedWord === w.qWord;

                  return (
                    <motion.button
                      key={w.id}
                      whileTap={!isMatched ? tapScale : undefined}
                      disabled={isMatched}
                      onClick={() => handleSelectWord(w.qWord)}
                      className={`w-full p-3 rounded-xl border-2 font-bold text-center transition-all text-sm sm:text-base ${
                        isMatched
                          ? 'bg-emerald-500 border-emerald-600 text-white opacity-80 cursor-default'
                          : isSelected
                          ? 'border-purple-600 dark:border-purple-400 bg-purple-200 dark:bg-purple-950/80 text-purple-950 dark:text-purple-100 scale-102 font-black shadow-md'
                          : 'border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {w.qWord} {isMatched && '✔'}
                    </motion.button>
                  );
                })}
              </div>

              {/* Kolom Kanan: Target Penjelasan Fungsi */}
              <div className="space-y-2">
                {shuffledTargets.map(target => {
                  const isMatched = matchedPairs.includes(target.qWord);
                  const isWrong = wrongTargetWord === target.qWord;

                  return (
                    <motion.button
                      key={target.qWord}
                      whileTap={!isMatched ? tapScale : undefined}
                      disabled={isMatched}
                      onClick={() => handleSelectTarget(target)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all text-xs sm:text-sm font-medium leading-tight ${
                        isMatched
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 border-emerald-500 font-bold opacity-80'
                          : isWrong
                          ? 'bg-rose-100 dark:bg-rose-950 border-rose-400 text-rose-900 dark:text-rose-200'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {target.targetMatch} {isMatched && '✔'}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Kotak Selebrasi Semua Cocok */}
            {isGame2Done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 rounded-2xl text-center text-emerald-950 dark:text-emerald-100 space-y-1"
              >
                <span className="text-3xl block mb-1">🎉</span>
                <h4 className="font-bold text-lg">Luar Biasa! Semua Cocok!</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Kamu sudah menguasai seluruh rumus kata tanya 5W1H / ADiKSiMBa!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
