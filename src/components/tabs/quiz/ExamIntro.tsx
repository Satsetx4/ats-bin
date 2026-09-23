import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, UserCheck } from 'lucide-react';
import { itemVariants, tapScale } from '@/lib/motion';

interface ExamIntroProps {
  name: string;
  className: string;
  school: string;
  onNameChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onSchoolChange: (value: string) => void;
  onStart: () => void;
}

export const ExamIntro: React.FC<ExamIntroProps> = ({
  name,
  className,
  school,
  onNameChange,
  onClassChange,
  onSchoolChange,
  onStart,
}) => (
  <motion.form
    variants={itemVariants}
    onSubmit={event => {
      event.preventDefault();
      onStart();
    }}
    className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-800 shadow-sm text-center max-w-xl mx-auto space-y-6"
  >
    <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
      <Clock className="w-8 h-8" aria-hidden="true" />
    </div>

    <div>
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
        Ujian Detektif Membaca
      </h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
        Kerjakan <strong>15 butir soal dari semua kategori</strong> dalam batas waktu <strong>15 menit</strong>.
      </p>
    </div>

    <div role="group" aria-labelledby="exam-identity-heading" className="bg-amber-50/80 dark:bg-amber-950/40 p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 text-left space-y-3.5 shadow-inner">
      <div id="exam-identity-heading" className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-sm">
        <UserCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <span>Identitas untuk piagam hasil belajar</span>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Nama Lengkap Siswa: <span aria-hidden="true" className="text-rose-500 font-black">*</span>
          </label>
          <input
            id="student-name"
            type="text"
            required
            autoComplete="off"
            value={name}
            onChange={event => onNameChange(event.target.value)}
            placeholder="Masukkan nama lengkap"
            className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:border-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="student-class" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Kelas / Rombel:
            </label>
            <input
              id="student-class"
              type="text"
              autoComplete="off"
              value={className}
              onChange={event => onClassChange(event.target.value)}
              placeholder="Masukkan kelas atau rombel"
              className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:border-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="student-school" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nama Sekolah (Opsional):
            </label>
            <input
              id="student-school"
              type="text"
              autoComplete="off"
              value={school}
              onChange={event => onSchoolChange(event.target.value)}
              placeholder="Masukkan nama sekolah"
              className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:border-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300">
        Identitas hanya tersimpan selama sesi tab ini.
      </p>
    </div>

    <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1.5">
      <p>✔ Setiap soal memiliki tombol TTS untuk mendengarkan bacaan.</p>
      <p>✔ Hasil ujian dapat dicetak sebagai piagam hasil belajar.</p>
    </div>

    <motion.button
      type="submit"
      whileTap={tapScale}
      onClick={onStart}
      className="w-full min-h-12 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-base rounded-2xl shadow-lg transition-transform flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
    >
      <span>Mulai Ujian Sekarang</span>
      <Sparkles className="w-5 h-5" aria-hidden="true" />
    </motion.button>
  </motion.form>
);
