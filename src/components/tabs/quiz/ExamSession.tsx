import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Flag, Volume2, VolumeX } from 'lucide-react';
import type { QuestionItem } from '@/data/types';
import { itemVariants, tapScale } from '@/lib/motion';

interface ExamSessionProps {
  questions: readonly QuestionItem[];
  answers: readonly (number | null)[];
  currentIndex: number;
  remainingSeconds: number;
  studentName: string;
  muted: boolean;
  isSpeaking: boolean;
  formatTime: (seconds: number) => string;
  onToggleTts: (question: QuestionItem) => void;
  onAnswer: (optionIndex: number) => void;
  onGoToQuestion: (index: number) => void;
  onFinish: () => void;
}

export const ExamSession: React.FC<ExamSessionProps> = ({
  questions,
  answers,
  currentIndex,
  remainingSeconds,
  studentName,
  muted,
  isSpeaking,
  formatTime,
  onToggleTts,
  onAnswer,
  onGoToQuestion,
  onFinish,
}) => {
  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  const answeredCount = answers.filter(answer => answer !== null).length;

  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-bold text-slate-800 dark:text-white text-sm">
            Soal {currentIndex + 1} dari {questions.length}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold hidden sm:inline-block">
            {currentQuestion.categoryName}
          </span>
          <span className="min-w-0 truncate text-xs font-bold text-slate-500 dark:text-slate-400 hidden md:inline-block">
            • {studentName}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <motion.button
            type="button"
            whileTap={tapScale}
            disabled={muted}
            aria-pressed={isSpeaking}
            aria-label={muted ? 'Suara dimatikan' : isSpeaking ? 'Hentikan suara soal' : 'Dengarkan soal'}
            onClick={() => onToggleTts(currentQuestion)}
            className={`min-w-11 min-h-11 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
            }`}
            title={muted ? 'Suara dimatikan' : isSpeaking ? 'Hentikan suara' : 'Dengarkan soal'}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Hentikan' : 'Dengarkan'}</span>
          </motion.button>

          <div
            role="timer"
            aria-live="off"
            aria-label={`Sisa waktu ${formatTime(remainingSeconds)}`}
            className={`flex items-center gap-2 px-3 min-h-11 rounded-xl font-black text-sm border ${
              remainingSeconds < 180
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 animate-pulse'
                : 'bg-rose-50 dark:bg-slate-800 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4 text-rose-500" aria-hidden="true" />
            <span>{formatTime(remainingSeconds)}</span>
          </div>
        </div>
      </div>

      <div
        role="progressbar"
        aria-label="Soal yang sudah dijawab"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={answeredCount}
        className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden"
      >
        <div className="bg-amber-400 h-full rounded-full transition-all duration-300" style={{ width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%` }} />
      </div>

      <nav aria-label="Navigasi soal ujian" className="flex flex-wrap gap-1.5 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {questions.map((question, index) => {
          const isAnswered = answers[index] !== null;
          const isCurrent = index === currentIndex;
          return (
            <button
              type="button"
              key={question.id}
              onClick={() => onGoToQuestion(index)}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Soal ${index + 1}${isAnswered ? ', sudah dijawab' : ', belum dijawab'}`}
              className={`min-w-11 min-h-11 rounded-lg font-bold text-xs border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-amber-600 ${
                isCurrent
                  ? 'bg-amber-400 border-amber-600 text-amber-950 font-extrabold shadow-sm'
                  : isAnswered
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </nav>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-left">
        {currentQuestion.passage && (
          <blockquote className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-xl text-sm text-slate-700 dark:text-slate-300 italic">
            “{currentQuestion.passage}”
          </blockquote>
        )}

        <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div role="group" aria-label="Pilihan jawaban" className="space-y-2.5">
          {currentQuestion.options.map((option, optionIndex) => {
            const selected = answers[currentIndex] === optionIndex;
            return (
              <motion.button
                type="button"
                key={`${currentQuestion.id}-${optionIndex}`}
                whileTap={tapScale}
                aria-pressed={selected}
                onClick={() => onAnswer(optionIndex)}
                className={`w-full min-h-14 p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  selected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${selected ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="leading-snug">{option}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <motion.button
            type="button"
            whileTap={tapScale}
            disabled={currentIndex === 0}
            onClick={() => onGoToQuestion(currentIndex - 1)}
            className="min-h-11 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Sebelumnya
          </motion.button>

          {currentIndex === questions.length - 1 ? (
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={onFinish}
              className="min-h-11 px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm transition-all shadow-md flex items-center gap-1.5"
            >
              <Flag className="w-4 h-4" aria-hidden="true" /> Selesaikan Ujian
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={() => onGoToQuestion(currentIndex + 1)}
              className="min-h-11 px-4 sm:px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm transition-all shadow-md flex items-center gap-1.5"
            >
              Berikutnya <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
