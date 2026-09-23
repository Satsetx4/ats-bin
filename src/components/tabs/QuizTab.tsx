import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { containerVariants, itemVariants, tapScale } from '@/lib/motion';
import { questionBankData } from '@/data/learningData';
import type { QuestionItem } from '@/data/types';
import { sound } from '@/lib/audio';
import { useExamSession } from '@/hooks/useExamSession';
import { useTts } from '@/hooks/useTts';
import { calculateExamScore } from '@/lib/exam';
import { restorePracticeAnswers } from '@/lib/learningProgress';
import { safeStorage, STORAGE_KEYS } from '@/lib/storage';
import type { ExamStatus } from '@/lib/examSession';
import { ExamIntro } from './quiz/ExamIntro';
import { ExamSession } from './quiz/ExamSession';
import { ExamResult } from './quiz/ExamResult';
import { PracticeMode, type QuizCategory } from './quiz/PracticeMode';
import confetti from 'canvas-confetti';

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
  const exam = useExamSession(questionBankData, 15 * 60 * 1_000, 15);
  const prefersReducedMotion = useReducedMotion();
  const tts = useTts();
  const [quizMode, setQuizMode] = useState<'latihan' | 'ujian'>(() => exam.session ? 'ujian' : 'latihan');
  const [activeCategory, setActiveCategory] = useState<QuizCategory>('ALL');
  
  // Identity follows this browser tab's attempt and is never stored persistently.
  const [studentName, setStudentName] = useState<string>(() => exam.session?.identity.name ?? '');
  const [studentClass, setStudentClass] = useState<string>(() => exam.session?.identity.className ?? '');
  const [studentSchool, setStudentSchool] = useState<string>(() => exam.session?.identity.school ?? '');

  // Practice state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>(() => restorePracticeAnswers(
    safeStorage.get<unknown>(STORAGE_KEYS.practiceAnswers, null),
    questionBankData,
  ));

  useEffect(() => {
    safeStorage.set(STORAGE_KEYS.practiceAnswers, practiceAnswers);
  }, [practiceAnswers]);

  const examStatus: ExamStatus = exam.session?.status ?? 'intro';
  const examQuestions = exam.questions;
  const examCurrentIndex = exam.session?.currentQuestionIndex ?? 0;
  const examAnswers = exam.session?.answers ?? [];
  const examTimeLeft = exam.remainingSeconds;
  const previousExamStatus = useRef<ExamStatus>(examStatus);

  // Stop speech if the application unmounts.
  useEffect(() => {
    return () => {
      sound.stopSpeech();
    };
  }, []);

  // Keep completion effects out of state updates and run them only on the active-to-result transition.
  useEffect(() => {
    const wasActive = previousExamStatus.current === 'active';
    previousExamStatus.current = examStatus;
    if (!wasActive || examStatus !== 'result') return undefined;

    sound.stopSpeech();
    sound.playFanfare();
    if (!prefersReducedMotion) {
      confetti({ particleCount: 80, spread: 55, origin: { y: 0.45 } });
    }
    const scrollTimer = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }, 60);

    return () => window.clearTimeout(scrollTimer);
  }, [examStatus, prefersReducedMotion]);

  // Handle Question TTS Audio
  const handleToggleQuestionTts = (q: QuestionItem) => {
    sound.playTap();
    const textToRead = [
      q.passage ? `Bacalah teks berikut: ${q.passage}.` : '',
      `Pertanyaan: ${q.question}.`,
      `Pilihan A: ${q.options[0]}.`,
      `Pilihan B: ${q.options[1]}.`,
      `Pilihan C: ${q.options[2]}.`,
      `Pilihan D: ${q.options[3]}.`
    ].filter(Boolean).join(' ');

    tts.toggle(textToRead, `question:${q.id}`);
  };

  // Start exam mode with name validation
  const startExam = () => {
    if (!studentName.trim()) {
      sound.playWrong();
      onShowModal(
        'Tuliskan Namamu Dulu Ya!',
        'Masukkan nama agar nama itu tercetak pada piagam hasil belajar sesi ini. 🔍✨',
        'alert'
      );
      return;
    }

    sound.stopSpeech();
    sound.playSuccess();
    exam.start({
      name: studentName,
      className: studentClass,
      school: studentSchool,
    });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const handleSelectExamOption = (optIdx: number) => {
    sound.playTap();
    exam.setAnswer(examCurrentIndex, optIdx);
  };

  const requestFinishExam = () => {
    sound.playTap();
    onShowModal(
      'Selesaikan Ujian Sekarang?',
      'Apakah kamu sudah yakin dengan semua jawabanmu dan ingin melihat hasil ujian? 🏁',
      'confirm',
      'Ya, Selesaikan!',
      'Periksa Lagi',
      () => exam.finish('submitted')
    );
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

  // Calculate exam score
  const calculatedExamScore = calculateExamScore(examQuestions, examAnswers);
  const correctExamCount = exam.session?.result?.correctCount ?? calculatedExamScore.correctCount;
  const examScore = exam.session?.result?.score ?? calculatedExamScore.score;

  let examPredikat: string;
  let examStars: string;
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

  const currentExamQ = examQuestions[examCurrentIndex];
  const isCurrentQuestionSpeaking = currentExamQ
    ? tts.isSpeaking(`question:${currentExamQ.id}`)
    : false;

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
            Tersedia 35 soal pilihan ganda, TTS, piagam hasil belajar, dan pembahasan lengkap.
          </p>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <motion.button
            whileTap={tapScale}
          onClick={() => {
              sound.playTap();
              sound.stopSpeech();
              setQuizMode('latihan');
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
              setQuizMode('ujian');
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

      {quizMode === 'latihan' && (
        <PracticeMode
          activeCategory={activeCategory}
          answers={practiceAnswers}
          muted={tts.muted}
          isSpeaking={tts.isSpeaking}
          onCategoryChange={category => {
            sound.playTap();
            sound.stopSpeech();
            setActiveCategory(category);
          }}
          onSpeak={handleToggleQuestionTts}
          onAnswer={handlePracticeOption}
        />
      )}
      {quizMode === 'ujian' && examStatus === 'intro' && (
        <ExamIntro
          name={studentName}
          className={studentClass}
          school={studentSchool}
          onNameChange={setStudentName}
          onClassChange={setStudentClass}
          onSchoolChange={setStudentSchool}
          onStart={startExam}
        />
      )}
      {quizMode === 'ujian' && examStatus === 'active' && currentExamQ && (
        <ExamSession
          questions={examQuestions}
          answers={examAnswers}
          currentIndex={examCurrentIndex}
          remainingSeconds={examTimeLeft}
          studentName={exam.session?.identity.name ?? ''}
          muted={tts.muted}
          isSpeaking={isCurrentQuestionSpeaking}
          formatTime={formatTime}
          onToggleTts={handleToggleQuestionTts}
          onAnswer={handleSelectExamOption}
          onGoToQuestion={index => {
            sound.playTap();
            sound.stopSpeech();
            exam.goToQuestion(index);
          }}
          onFinish={requestFinishExam}
        />
      )}
      {quizMode === 'ujian' && exam.session?.status === 'result' && (
        <ExamResult
          identity={exam.session.identity}
          attemptId={exam.session.attemptId}
          questions={examQuestions}
          answers={examAnswers}
          score={examScore}
          correctCount={correctExamCount}
          stars={examStars}
          predicate={examPredikat}
          completedAt={exam.session.result?.completedAt ?? exam.session.updatedAt}
          muted={tts.muted}
          isSpeaking={tts.isSpeaking}
          onToggleTts={handleToggleQuestionTts}
          onPrint={() => {
            sound.playTap();
            window.print();
          }}
          onRetake={() => {
            sound.playTap();
            exam.reset();
            setStudentName('');
            setStudentClass('');
            setStudentSchool('');
          }}
        />
      )}
    </motion.section>
  );
};
