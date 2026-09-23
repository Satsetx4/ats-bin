import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { questionBankData } from '@/data/learningData';
import type { QuestionItem } from '@/data/types';
import { itemVariants, tapScale } from '@/lib/motion';

export type QuizCategory = 'ALL' | 'A' | 'B' | 'C' | 'D';

const categories: Array<{ id: QuizCategory; label: string }> = [
  { id: 'ALL', label: 'Semua Soal' },
  { id: 'A', label: 'A. Paragraf & Ide Pokok' },
  { id: 'B', label: 'B. Kalimat Utama & Penjelas' },
  { id: 'C', label: 'C. Memahami Bacaan (5W1H)' },
  { id: 'D', label: 'D. Info Penting & Ringkasan' },
];

interface PracticeModeProps {
  activeCategory: QuizCategory;
  answers: Readonly<Record<number, number>>;
  muted: boolean;
  isSpeaking: (key: string) => boolean;
  onCategoryChange: (category: QuizCategory) => void;
  onSpeak: (question: QuestionItem) => void;
  onAnswer: (questionId: number, optionIndex: number, correctAnswer: number) => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  activeCategory,
  answers,
  muted,
  isSpeaking,
  onCategoryChange,
  onSpeak,
  onAnswer,
}) => {
  const questions = activeCategory === 'ALL'
    ? questionBankData
    : questionBankData.filter(question => question.category === activeCategory);

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div role="group" aria-label="Filter kategori soal" className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">Kategori:</span>
          {categories.map(category => (
            <motion.button
              type="button"
              key={category.id}
              whileTap={tapScale}
              aria-pressed={activeCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`min-h-11 px-3 rounded-xl text-xs font-bold transition-all shrink-0 ${activeCategory === category.id ? 'bg-amber-500 text-white shadow-sm font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
        <span aria-live="polite" className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
          {questions.length} soal
        </span>
      </div>

      <div className="space-y-4">
        {questions.map(question => {
          const userAnswer = answers[question.id];
          const answered = userAnswer !== undefined;
          const correct = answered && userAnswer === question.correctAnswer;
          const key = `question:${question.id}`;
          const speaking = isSpeaking(key);

          return (
            <article key={question.id} className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6 text-left">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                    Soal #{question.id} • {question.categoryName}
                  </span>
                  <motion.button
                    type="button"
                    whileTap={tapScale}
                    disabled={muted}
                    aria-pressed={speaking}
                    aria-label={muted ? 'Suara dimatikan' : speaking ? 'Hentikan suara soal' : 'Dengarkan soal'}
                    onClick={() => onSpeak(question)}
                    className={`min-w-11 min-h-11 px-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${speaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-200'}`}
                    title={muted ? 'Suara dimatikan' : speaking ? 'Hentikan suara' : 'Dengarkan soal'}
                  >
                    {speaking ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
                    <span className="hidden sm:inline">{speaking ? 'Hentikan suara' : 'Dengarkan soal'}</span>
                  </motion.button>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                  {answered ? 'Sudah dijawab' : 'Pilih jawaban yang benar'}
                </span>
              </div>

              {question.passage && (
                <blockquote className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-3.5 rounded-r-xl text-sm text-slate-700 dark:text-slate-300 mb-3 italic">
                  “{question.passage}”
                </blockquote>
              )}

              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-4 leading-relaxed">
                {question.question}
              </h3>

              <div role="group" aria-label={`Pilihan jawaban soal ${question.id}`} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {question.options.map((option, optionIndex) => {
                  const selected = userAnswer === optionIndex;
                  let buttonStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700';
                  if (answered) {
                    if (optionIndex === question.correctAnswer) {
                      buttonStyle = 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 border-emerald-500 font-bold';
                    } else if (selected) {
                      buttonStyle = 'bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-100 border-rose-500 font-semibold';
                    } else {
                      buttonStyle = 'opacity-60 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500';
                    }
                  }

                  return (
                    <motion.button
                      type="button"
                      key={`${question.id}-${optionIndex}`}
                      whileTap={!answered ? tapScale : undefined}
                      disabled={answered}
                      aria-pressed={selected}
                      onClick={() => onAnswer(question.id, optionIndex, question.correctAnswer)}
                      className={`min-h-12 p-3 rounded-xl border-2 text-left font-medium text-sm transition-all flex items-start gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${buttonStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${answered && optionIndex === question.correctAnswer ? 'bg-emerald-500 text-white' : answered && selected ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {answered && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <div className={`p-2.5 rounded-xl font-bold text-sm flex items-center gap-2 ${correct ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800' : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800'}`}>
                    {correct && <CheckCircle2 className="w-4 h-4" aria-hidden="true" />}
                    <span>{correct ? 'Jawaban kamu benar. Hebat sekali!' : `Belum tepat. Jawaban yang benar adalah pilihan (${String.fromCharCode(65 + question.correctAnswer)}).`}</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl p-3.5 text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-blue-900 dark:text-blue-300 block mb-1">📖 Pembahasan:</strong>
                    {question.explanation}
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-medium flex items-start gap-2">
                    <span aria-hidden="true" className="text-base">💡</span>
                    <span><strong>Trik Detektif:</strong> {question.detectiveTip}</span>
                  </div>
                </motion.div>
              )}
            </article>
          );
        })}
      </div>
    </motion.div>
  );
};
