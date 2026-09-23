import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, CheckSquare, Printer, RotateCcw, Volume2, VolumeX, XCircle } from 'lucide-react';
import type { QuestionItem } from '@/data/types';
import type { StudentIdentity } from '@/lib/examSession';
import { itemVariants, tapScale } from '@/lib/motion';

interface ExamResultProps {
  identity: StudentIdentity;
  attemptId: string;
  questions: readonly QuestionItem[];
  answers: readonly (number | null)[];
  score: number;
  correctCount: number;
  stars: string;
  predicate: string;
  completedAt: number;
  muted: boolean;
  isSpeaking: (key: string) => boolean;
  onToggleTts: (question: QuestionItem) => void;
  onPrint: () => void;
  onRetake: () => void;
}

export const ExamResult: React.FC<ExamResultProps> = ({
  identity,
  attemptId,
  questions,
  answers,
  score,
  correctCount,
  stars,
  predicate,
  completedAt,
  muted,
  isSpeaking,
  onToggleTts,
  onPrint,
  onRetake,
}) => {
  const dateLabel = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(completedAt));

  return (
    <motion.div variants={itemVariants} className="space-y-6 pt-2">
      <article aria-labelledby="exam-result-title" className="certificate-print-area bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-400 dark:border-amber-500 shadow-xl text-center max-w-2xl mx-auto relative overflow-hidden">
        <span aria-hidden="true" className="absolute top-2 left-2 text-amber-400 text-xl font-black">✦</span>
        <span aria-hidden="true" className="absolute top-2 right-2 text-amber-400 text-xl font-black">✦</span>
        <span aria-hidden="true" className="absolute bottom-2 left-2 text-amber-400 text-xl font-black">✦</span>
        <span aria-hidden="true" className="absolute bottom-2 right-2 text-amber-400 text-xl font-black">✦</span>

        <div className="space-y-1 border-b-2 border-amber-200 dark:border-amber-900/60 pb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>Piagam Hasil Belajar</span>
          </div>
          <h2 id="exam-result-title" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider pt-2">
            Detektif Cilik Membaca
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            Bahasa Indonesia Kelas 3 SD • Materi Ide Pokok & Isi Bacaan
          </p>
        </div>

        <div className="py-6 space-y-2">
          <p className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Hasil belajar untuk:</p>
          <p className="text-2xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 underline decoration-amber-300 decoration-wavy underline-offset-8">
            {identity.name}
          </p>
          {(identity.className || identity.school) && (
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
              {identity.className && <span>{identity.className}</span>}
              {identity.school && <span>{identity.school}</span>}
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed mb-5">
          Hasil ini mencatat jawaban dan skor pada satu sesi belajar.
        </p>

        <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-slate-800 rounded-2xl border-2 border-amber-300 dark:border-amber-700 max-w-sm mx-auto shadow-inner mb-6">
          <span aria-label={`${stars.length / 2} bintang`} className="text-2xl sm:text-3xl block mb-1">{stars}</span>
          <span className="text-4xl sm:text-5xl font-black text-amber-600 dark:text-amber-400 block leading-tight">
            {score} <span className="text-xl sm:text-2xl font-bold text-slate-500">/ 100</span>
          </span>
          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 block mt-1">{predicate}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium mt-0.5">
            {correctCount} dari {questions.length} soal dijawab benar
          </span>
        </div>

        <div className="border-t-2 border-amber-200 dark:border-amber-900/60 pt-4 flex items-end justify-between gap-3 text-left text-xs text-slate-600 dark:text-slate-400">
          <div>
            <span className="block font-bold text-slate-800 dark:text-slate-200">Tanggal ujian:</span>
            <span>{dateLabel}</span>
            <span className="block font-mono text-[10px] text-slate-400 mt-1">ID: {attemptId}</span>
          </div>
          <div className="text-right">
            <div className="w-28 h-10 border-b border-dashed border-amber-500 flex items-center justify-center mx-auto text-amber-500/70 italic">Hasil belajar</div>
            <span className="block font-bold text-slate-800 dark:text-slate-200 mt-1">Detektif Cilik Membaca</span>
            <span className="text-[10px]">Ujian mandiri</span>
          </div>
        </div>
      </article>

      <div className="no-print flex flex-wrap items-center justify-center gap-3">
        <motion.button
          type="button"
          whileTap={tapScale}
          onClick={onPrint}
          className="min-h-11 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition-all flex items-center gap-2 text-sm"
        >
          <Printer className="w-4 h-4" aria-hidden="true" /> Cetak / Simpan Hasil (PDF)
        </motion.button>
        <motion.button
          type="button"
          whileTap={tapScale}
          onClick={onRetake}
          className="min-h-11 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" /> Ulangi Ujian
        </motion.button>
      </div>

      <section aria-labelledby="exam-review-title" className="no-print bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
        <h3 id="exam-review-title" className="font-bold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <span>Evaluasi & Pembahasan Setiap Soal Ujian</span>
        </h3>

        <div className="space-y-3">
          {questions.map((question, index) => {
            const answer = answers[index];
            const correct = answer === question.correctAnswer;
            const key = `question:${question.id}`;
            const speaking = isSpeaking(key);
            return (
              <article
                key={question.id}
                className={`p-4 rounded-2xl border-2 text-left ${correct ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30' : 'border-rose-200 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/30'}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm flex items-center gap-1.5 ${correct ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                      {correct ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : <XCircle className="w-4 h-4" aria-hidden="true" />}
                      Soal #{index + 1} ({correct ? 'BENAR' : 'SALAH'})
                    </span>
                    <button
                      type="button"
                      disabled={muted}
                      aria-pressed={speaking}
                      aria-label={muted ? 'Suara dimatikan' : speaking ? 'Hentikan suara soal' : 'Dengarkan soal'}
                      onClick={() => onToggleTts(question)}
                      className={`min-w-11 min-h-11 rounded-lg flex items-center justify-center transition-all ${speaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
                    >
                      {speaking ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
                    </button>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {question.categoryName}
                  </span>
                </div>

                {question.passage && <p className="italic text-xs text-slate-600 dark:text-slate-300 mb-2">“{question.passage}”</p>}
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-2">{question.question}</p>
                <div className="text-xs space-y-1">
                  <p className={`font-medium ${correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                    Jawabanmu: {answer !== null ? `${String.fromCharCode(65 + answer)}. ${question.options[answer]}` : <em>Tidak dijawab</em>}
                  </p>
                  {!correct && <p className="text-emerald-700 dark:text-emerald-300 font-bold">Kunci jawaban: {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}</p>}
                </div>
                <p className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400">
                  <strong>Tips pembahasan:</strong> {question.explanation}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};
