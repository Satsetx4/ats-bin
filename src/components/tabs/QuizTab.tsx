import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, tapScale } from '@/lib/motion';
import { questionBankData, type QuestionItem } from '@/data/learningData';
import { sound } from '@/lib/audio';
import { safeStorage } from '@/lib/storage';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckSquare,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Flag,
  Volume2,
  VolumeX,
  Printer,
  Award,
  UserCheck,
  Sparkles,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface QuizTabProps {
  onShowModal: (
    title: string,
    message: string,
    type?: 'info' | 'alert' | 'success' | 'confirm',
    confirmText?: string,
    cancelText?: string,
    onConfirm?: () => void
  ) => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({ onShowModal }) => {
  const [quizMode, setQuizMode] = useState<'latihan' | 'ujian'>('latihan');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');
  
  // Student identity state with safe localStorage persistence
  const [studentName, setStudentName] = useState<string>(() => safeStorage.get<string>('ats_student_name', ''));
  const [studentClass, setStudentClass] = useState<string>(() => safeStorage.get<string>('ats_student_class', 'Kelas 3'));
  const [studentSchool, setStudentSchool] = useState<string>(() => safeStorage.get<string>('ats_student_school', ''));

  // TTS audio state for questions
  const [speakingQuestionId, setSpeakingQuestionId] = useState<number | null>(null);

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});

  // Exam state
  const [examStatus, setExamStatus] = useState<'intro' | 'active' | 'result'>('intro');
  const [examQuestions, setExamQuestions] = useState<QuestionItem[]>([]);
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<(number | null)[]>([]);
  const [examTimeLeft, setExamTimeLeft] = useState<number>(15 * 60); // 15 menit
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer & stop speech on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      sound.stopSpeech();
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (examStatus === 'active') {
      timerRef.current = setInterval(() => {
        setExamTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStatus]);

  // Handle Question TTS Audio
  const handleToggleQuestionTts = (q: QuestionItem) => {
    sound.playTap();
    if (speakingQuestionId === q.id) {
      sound.stopSpeech();
      setSpeakingQuestionId(null);
    } else {
      sound.stopSpeech();
      setSpeakingQuestionId(q.id);
      const textToRead = [
        q.passage ? `Bacalah teks berikut: ${q.passage}.` : '',
        `Pertanyaan: ${q.question}.`,
        `Pilihan A: ${q.options[0]}.`,
        `Pilihan B: ${q.options[1]}.`,
        `Pilihan C: ${q.options[2]}.`,
        `Pilihan D: ${q.options[3]}.`
      ].filter(Boolean).join(' ');

      sound.speakText(
        textToRead,
        () => setSpeakingQuestionId(q.id),
        () => setSpeakingQuestionId(null)
      );
    }
  };

  // Start exam mode with name validation
  const startExam = () => {
    if (!studentName.trim()) {
      sound.playWrong();
      onShowModal(
        'Tuliskan Namamu Dulu Ya!',
        'Halo Detektif Cilik! Silakan masukkan nama lengkapmu pada formulir di bawah agar namamu otomatis tercetak di Sertifikat Penghargaan Detektif! 🔍✨',
        'alert'
      );
      return;
    }

    // Save student profile
    safeStorage.set('ats_student_name', studentName.trim());
    safeStorage.set('ats_student_class', studentClass.trim());
    safeStorage.set('ats_student_school', studentSchool.trim());

    sound.stopSpeech();
    setSpeakingQuestionId(null);
    sound.playSuccess();

    const shuffled = [...questionBankData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 15);
    setExamQuestions(selected);
    setExamAnswers(new Array(15).fill(null));
    setExamCurrentIndex(0);
    setExamTimeLeft(15 * 60);
    setExamStatus('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExamOption = (optIdx: number) => {
    sound.playTap();
    setExamAnswers(prev => {
      const updated = [...prev];
      updated[examCurrentIndex] = optIdx;
      return updated;
    });
  };

  const requestFinishExam = () => {
    sound.playTap();
    onShowModal(
      'Selesaikan Ujian Sekarang?',
      'Apakah kamu sudah yakin dengan semua jawabanmu dan ingin melihat sertifikat nilai akhir? 🏁',
      'confirm',
      'Ya, Selesaikan!',
      'Periksa Lagi',
      () => finishExam()
    );
  };

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    sound.stopSpeech();
    setSpeakingQuestionId(null);
    sound.playFanfare();
    confetti({ particleCount: 140, spread: 90, origin: { y: 0.45 } });
    setExamStatus('result');

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
  };

  // Practice answer selection
  const handlePracticeOption = (qid: number, optIdx: number, correctAns: number) => {
    if (practiceAnswers[qid] !== undefined) return;
    if (optIdx === correctAns) {
      sound.playSuccess();
    } else {
      sound.playWrong();
    }
    setPracticeAnswers(prev => ({
      ...prev,
      [qid]: optIdx,
    }));
  };

  // Format timer MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filtered practice questions
  const filteredQuestions =
    activeCategory === 'ALL'
      ? questionBankData
      : questionBankData.filter(q => q.category === activeCategory);

  // Calculate exam score
  let correctExamCount = 0;
  if (examStatus === 'result') {
    examQuestions.forEach((q, idx) => {
      if (examAnswers[idx] === q.correctAnswer) {
        correctExamCount++;
      }
    });
  }
  const examScore = examQuestions.length > 0 ? Math.round((correctExamCount / examQuestions.length) * 100) : 0;

  let examPredikat = 'Detektif Muda Berbakat';
  let examStars = '⭐⭐⭐';
  if (examScore === 100) {
    examPredikat = 'Detektif Master Bintang Emas (Sempurna)';
    examStars = '⭐⭐⭐⭐⭐';
  } else if (examScore >= 80) {
    examPredikat = 'Detektif Handal (Sangat Cerdas)';
    examStars = '⭐⭐⭐⭐';
  } else if (examScore >= 65) {
    examPredikat = 'Detektif Muda Berbakat (Bagus)';
    examStars = '⭐⭐⭐';
  } else {
    examPredikat = 'Calon Detektif Cilik (Terus Berlatih)';
    examStars = '⭐⭐';
  }

  // Indonesian current date for certificate
  const todayDateStr = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const currentExamQ = examQuestions[examCurrentIndex];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Tab Kuis & Switcher Mode (Disembunyikan saat Cetak) */}
      <motion.div
        variants={itemVariants}
        className="no-print bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="text-left">
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full inline-block">
            Evaluasi Belajar Interaktif
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Bank Soal & Asesmen Mandiri
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Tersedia 35 butir soal pilihan ganda, fitur suara TTS, sertifikat kelulusan digital, dan pembahasan lengkap.
          </p>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <motion.button
            whileTap={tapScale}
            onClick={() => {
              sound.playTap();
              sound.stopSpeech();
              setSpeakingQuestionId(null);
              setQuizMode('latihan');
              setExamStatus('intro');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              quizMode === 'latihan'
                ? 'bg-amber-400 text-amber-950 shadow font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Mode Latihan Mandiri
          </motion.button>
          <motion.button
            whileTap={tapScale}
            onClick={() => {
              sound.playTap();
              sound.stopSpeech();
              setSpeakingQuestionId(null);
              setQuizMode('ujian');
              setExamStatus('intro');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              quizMode === 'ujian'
                ? 'bg-amber-400 text-amber-950 shadow font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Mode Ujian Berwaktu ⏱️
          </motion.button>
        </div>
      </motion.div>

      {/* ================= TAMPILAN 1: MODE LATIHAN MANDIRI ================= */}
      {quizMode === 'latihan' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
                Kategori:
              </span>
              {[
                { id: 'ALL', label: 'Semua Soal' },
                { id: 'A', label: 'A. Paragraf & Ide Pokok' },
                { id: 'B', label: 'B. Kalimat Utama & Penjelas' },
                { id: 'C', label: 'C. Memahami Bacaan (5W1H)' },
                { id: 'D', label: 'D. Info Penting & Ringkasan' },
              ].map(cat => (
                <motion.button
                  key={cat.id}
                  whileTap={tapScale}
                  onClick={() => {
                    sound.playTap();
                    sound.stopSpeech();
                    setSpeakingQuestionId(null);
                    setActiveCategory(cat.id as typeof activeCategory);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-white shadow-sm font-black'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
              {filteredQuestions.length} Soal
            </span>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map(q => {
              const userAnswer = practiceAnswers[q.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === q.correctAnswer;
              const isThisSpeaking = speakingQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6 text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                        Soal #{q.id} • {q.categoryName}
                      </span>

                      {/* TTS Question Audio Button */}
                      <motion.button
                        whileTap={tapScale}
                        onClick={() => handleToggleQuestionTts(q)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isThisSpeaking
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-200'
                        }`}
                        title={isThisSpeaking ? 'Hentikan Suara' : 'Dengarkan Soal (TTS)'}
                      >
                        {isThisSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Hentikan Suara</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Dengarkan Soal</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                      {isAnswered ? 'Sudah Dijawab' : 'Pilih jawaban yang benar'}
                    </span>
                  </div>

                  {q.passage && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-3.5 rounded-r-xl text-sm text-slate-700 dark:text-slate-300 mb-3 italic">
                      "{q.passage}"
                    </div>
                  )}

                  <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-4 leading-relaxed">
                    {q.question}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700';

                      if (isAnswered) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 border-emerald-500 font-bold';
                        } else if (optIdx === userAnswer) {
                          btnStyle = 'bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-100 border-rose-500 font-semibold';
                        } else {
                          btnStyle = 'opacity-40 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400';
                        }
                      }

                      return (
                        <motion.button
                          key={optIdx}
                          whileTap={!isAnswered ? tapScale : undefined}
                          disabled={isAnswered}
                          onClick={() => handlePracticeOption(q.id, optIdx, q.correctAnswer)}
                          className={`p-3 rounded-xl border-2 text-left font-medium text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                              isAnswered && optIdx === q.correctAnswer
                                ? 'bg-emerald-500 text-white'
                                : isAnswered && optIdx === userAnswer
                                ? 'bg-rose-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation and Detective Tip */}
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5"
                    >
                      <div
                        className={`p-2.5 rounded-xl font-bold text-sm flex items-center gap-2 ${
                          isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
                        }`}
                      >
                        <span>{isCorrect ? '🎉' : '❌'}</span>
                        <span>
                          {isCorrect
                            ? 'Jawaban Kamu BENAR! Hebat sekali!'
                            : `Belum tepat. Jawaban yang benar adalah pilihan (${String.fromCharCode(65 + q.correctAnswer)}).`}
                        </span>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl p-3.5 text-sm text-slate-700 dark:text-slate-300">
                        <strong className="text-blue-900 dark:text-blue-300 block mb-1">
                          📖 Pembahasan:
                        </strong>
                        {q.explanation}
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-medium flex items-start gap-2">
                        <span className="text-base">💡</span>
                        <span>
                          <strong>Trik Detektif:</strong> {q.detectiveTip}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ================= TAMPILAN 2: MODE UJIAN INTRO & FORM IDENTITAS SISWA ================= */}
      {quizMode === 'ujian' && examStatus === 'intro' && (
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-800 shadow-sm text-center max-w-xl mx-auto space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Clock className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ujian Detektif Membaca
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Kerjakan <strong>15 butir soal acak</strong> dalam batas waktu <strong>15 menit</strong>.
            </p>
          </div>

          {/* FORM IDENTITAS SISWA */}
          <div className="bg-amber-50/80 dark:bg-amber-950/40 p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 text-left space-y-3.5 shadow-inner">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-sm">
              <UserCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Formulir Identitas Siswa (Untuk Sertifikat)</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Siswa: <span className="text-rose-500 font-black">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="Contoh: Budi Santoso / Aisyah Putri"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kelas / Rombel:
                  </label>
                  <input
                    type="text"
                    value={studentClass}
                    onChange={e => setStudentClass(e.target.value)}
                    placeholder="Contoh: Kelas 3A / 3B"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Sekolah (Opsional):
                  </label>
                  <input
                    type="text"
                    value={studentSchool}
                    onChange={e => setStudentSchool(e.target.value)}
                    placeholder="Contoh: SDN 1 Merdeka"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1.5">
            <p className="flex items-center gap-2">
              <span className="font-bold text-amber-500">✔</span> Setiap soal dilengkapi tombol suara TTS untuk mendengarkan bacaan.
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-amber-500">✔</span> Di akhir ujian, nama siswa akan otomatis tercetak di Sertifikat Kelulusan!
            </p>
          </div>

          <motion.button
            whileTap={tapScale}
            onClick={startExam}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-base rounded-2xl shadow-lg transition-transform flex items-center justify-center gap-2"
          >
            <span>Mulai Ujian Sekarang</span>
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* ================= TAMPILAN 3: MODE UJIAN AKTIF ================= */}
      {quizMode === 'ujian' && examStatus === 'active' && currentExamQ && (
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Status Bar: Nomor Soal & Timer */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-white text-sm">
                Soal {examCurrentIndex + 1} dari {examQuestions.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold hidden sm:inline-block">
                {currentExamQ.categoryName}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden md:inline-block">
                • {studentName || 'Detektif Cilik'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* TTS Button on Active Exam Question */}
              <motion.button
                whileTap={tapScale}
                onClick={() => handleToggleQuestionTts(currentExamQ)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  speakingQuestionId === currentExamQ.id
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                }`}
                title={speakingQuestionId === currentExamQ.id ? 'Hentikan Suara' : 'Dengarkan Soal (TTS)'}
              >
                {speakingQuestionId === currentExamQ.id ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span className="hidden sm:inline">Hentikan</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Dengarkan Soal</span>
                  </>
                )}
              </motion.button>

              {/* Timer Display */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-black text-sm border ${
                  examTimeLeft < 180
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 animate-pulse'
                    : 'bg-rose-50 dark:bg-slate-800 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-slate-700'
                }`}
              >
                <Clock className="w-4 h-4 text-rose-500" />
                <span>{formatTime(examTimeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-amber-400 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(
                  (examAnswers.filter(a => a !== null).length / examQuestions.length) * 100
                )}%`,
              }}
            />
          </div>

          {/* Navigation Pills (1 to 15) */}
          <div className="flex flex-wrap gap-1.5 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {examQuestions.map((_, idx) => {
              const isAnswered = examAnswers[idx] !== null;
              const isCurrent = idx === examCurrentIndex;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playTap();
                    sound.stopSpeech();
                    setSpeakingQuestionId(null);
                    setExamCurrentIndex(idx);
                  }}
                  className={`w-8 h-8 rounded-lg font-bold text-xs border transition-all ${
                    isCurrent
                      ? 'bg-amber-400 border-amber-600 text-amber-950 font-extrabold scale-110 shadow-sm'
                      : isAnswered
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Box Soal Ujian */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-left">
            {currentExamQ.passage && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-4 rounded-r-xl text-sm text-slate-700 dark:text-slate-300 italic">
                "{currentExamQ.passage}"
              </div>
            )}

            <h3 className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl leading-relaxed">
              {currentExamQ.question}
            </h3>

            {/* Pilihan Jawaban */}
            <div className="space-y-2.5">
              {currentExamQ.options.map((opt, optIdx) => {
                const isSelected = examAnswers[examCurrentIndex] === optIdx;

                return (
                  <motion.button
                    key={optIdx}
                    whileTap={tapScale}
                    onClick={() => handleSelectExamOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Navigasi Tombol Bawah */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <motion.button
                whileTap={tapScale}
                disabled={examCurrentIndex === 0}
                onClick={() => {
                  sound.playTap();
                  sound.stopSpeech();
                  setSpeakingQuestionId(null);
                  setExamCurrentIndex(prev => Math.max(0, prev - 1));
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Sebelumnya
              </motion.button>

              {examCurrentIndex === examQuestions.length - 1 ? (
                <motion.button
                  whileTap={tapScale}
                  onClick={requestFinishExam}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm transition-all shadow-md flex items-center gap-1.5"
                >
                  <Flag className="w-4 h-4" /> Selesaikan Ujian 🏁
                </motion.button>
              ) : (
                <motion.button
                  whileTap={tapScale}
                  onClick={() => {
                    sound.playTap();
                    sound.stopSpeech();
                    setSpeakingQuestionId(null);
                    setExamCurrentIndex(prev => Math.min(examQuestions.length - 1, prev + 1));
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm transition-all shadow-md flex items-center gap-1.5"
                >
                  Berikutnya <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= TAMPILAN 4: HASIL UJIAN & SERTIFIKAT DIGITAL ================= */}
      {quizMode === 'ujian' && examStatus === 'result' && (
        <motion.div
          variants={itemVariants}
          className="space-y-6 pt-2"
        >
          {/* SERTIFIKAT DIGITAL KELULUSAN RESMI */}
          <div className="certificate-print-area bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-400 dark:border-amber-500 shadow-xl text-center max-w-2xl mx-auto relative overflow-hidden">
            {/* Ornate Corner Accents */}
            <div className="absolute top-2 left-2 text-amber-400 text-xl font-black">✦</div>
            <div className="absolute top-2 right-2 text-amber-400 text-xl font-black">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-400 text-xl font-black">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-400 text-xl font-black">✦</div>

            {/* Certificate Header */}
            <div className="space-y-1 border-b-2 border-amber-200 dark:border-amber-900/60 pb-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
                <Award className="w-4 h-4" />
                <span>Sertifikat Kelulusan Resmi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider pt-2">
                Detektif Cilik Membaca
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                Bahasa Indonesia Kelas 3 SD • Materi Ide Pokok & Isi Bacaan
              </p>
            </div>

            {/* Certificate Recipient */}
            <div className="py-6 space-y-2">
              <p className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                Diberikan dengan bangga kepada:
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 underline decoration-amber-300 decoration-wavy underline-offset-8">
                {studentName || 'Detektif Hebat'}
              </h2>
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
                <span>{studentClass || 'Kelas 3'}</span>
                {studentSchool && <span>• {studentSchool}</span>}
              </div>
            </div>

            {/* Statement of Achievement */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed mb-5">
              Telah berhasil menyelesaikan <strong>Ujian Sertifikasi Detektif Membaca</strong> dengan capaian kompetensi:
            </p>

            {/* Score & Badge Box */}
            <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-slate-800 rounded-2xl border-2 border-amber-300 dark:border-amber-700 max-w-sm mx-auto shadow-inner mb-6">
              <span className="text-2xl sm:text-3xl block mb-1">{examStars}</span>
              <span className="text-4xl sm:text-5xl font-black text-amber-600 dark:text-amber-400 block leading-tight">
                {examScore} <span className="text-xl sm:text-2xl font-bold text-slate-500">/ 100</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 block mt-1">
                {examPredikat}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium mt-0.5">
                {correctExamCount} dari {examQuestions.length} Soal Dijawab Benar
              </span>
            </div>

            {/* Certificate Footer Signature & Date */}
            <div className="border-t-2 border-amber-200 dark:border-amber-900/60 pt-4 flex items-end justify-between text-left text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="block font-bold text-slate-800 dark:text-slate-200">Tanggal Ujian:</span>
                <span>{todayDateStr}</span>
                <span className="block font-mono text-[10px] text-slate-400 mt-1">
                  ID: ATS-{Date.now().toString().slice(-6)}
                </span>
              </div>

              <div className="text-right">
                <div className="w-20 h-10 border-b border-dashed border-amber-500 flex items-center justify-center mx-auto text-amber-500/70 font-script italic">
                  ✓ Terverifikasi
                </div>
                <span className="block font-bold text-slate-800 dark:text-slate-200 mt-1">
                  Dewan Penguji Detektif
                </span>
                <span className="text-[10px]">Kelas 3 SD Indonesia</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Below Certificate (Hidden on Print) */}
          <div className="no-print flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                window.print();
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Sertifikat (PDF)</span>
            </motion.button>

            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                setExamStatus('intro');
              }}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Ujian</span>
            </motion.button>
          </div>

          {/* Evaluasi Setiap Soal Ujian (Disembunyikan saat cetak sertifikat) */}
          <div className="no-print bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
            <h4 className="font-bold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>Evaluasi & Pembahasan Setiap Soal Ujian:</span>
            </h4>

            <div className="space-y-3">
              {examQuestions.map((q, idx) => {
                const userAns = examAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                const isThisSpeaking = speakingQuestionId === q.id;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border-2 text-left ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30'
                        : 'border-rose-200 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm flex items-center gap-1.5 ${
                            isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                          }`}
                        >
                          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          Soal #{idx + 1} ({isCorrect ? 'BENAR' : 'SALAH'})
                        </span>

                        {/* Question TTS button */}
                        <button
                          onClick={() => handleToggleQuestionTts(q)}
                          className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            isThisSpeaking
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}
                          title={isThisSpeaking ? 'Hentikan Suara' : 'Dengarkan Soal'}
                        >
                          {isThisSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {q.categoryName}
                      </span>
                    </div>

                    {q.passage && (
                      <p className="italic text-xs text-slate-600 dark:text-slate-300 mb-2">
                        "{q.passage}"
                      </p>
                    )}

                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-2">
                      {q.question}
                    </p>

                    <div className="text-xs space-y-1">
                      <p
                        className={`font-medium ${
                          isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        Jawabanmu:{' '}
                        {userAns !== null ? (
                          `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}`
                        ) : (
                          <em>Tidak dijawab</em>
                        )}
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-700 dark:text-emerald-300 font-bold">
                          Kunci Jawaban: {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400">
                      <strong>Tips Pembahasan:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};
