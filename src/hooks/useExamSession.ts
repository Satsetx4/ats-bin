import { useCallback, useEffect, useMemo, useState } from 'react';
import type { QuestionItem } from '@/data/learningData';
import { selectBalancedQuestions } from '@/lib/exam';
import {
  createAttemptId,
  createExamSession,
  finishExamSession,
  getRemainingSeconds,
  restoreExamSession,
  setExamCurrentIndex,
  updateExamAnswer,
  type ExamCompletionReason,
  type ExamSession,
  type StudentIdentity,
} from '@/lib/examSession';
import { safeSessionStorage, STORAGE_KEYS } from '@/lib/storage';

export function useExamSession(
  questionBank: readonly QuestionItem[],
  durationMs: number,
  questionCount: number,
) {
  const questionById = useMemo(
    () => new Map(questionBank.map(question => [question.id, question])),
    [questionBank],
  );
  const [session, setSession] = useState<ExamSession | null>(() => restoreExamSession(
    safeSessionStorage.get<unknown>(STORAGE_KEYS.examSession, null),
    questionBank,
    Date.now(),
  ));
  const [clockNow, setClockNow] = useState(() => Date.now());

  const questions = useMemo(() => session
    ? session.questionIds.flatMap(id => {
      const question = questionById.get(id);
      return question ? [question] : [];
    })
    : [], [questionById, session]);

  useEffect(() => {
    if (session) {
      safeSessionStorage.set(STORAGE_KEYS.examSession, session);
    } else {
      safeSessionStorage.remove(STORAGE_KEYS.examSession);
    }
  }, [session]);

  useEffect(() => {
    if (session?.status !== 'active') return undefined;

    const updateFromDeadline = () => {
      const now = Date.now();
      setClockNow(now);
      setSession(current => current?.status === 'active' && now >= current.deadlineAt
        ? finishExamSession(current, questionBank, now, 'timeout')
        : current);
    };

    updateFromDeadline();
    const timer = window.setInterval(updateFromDeadline, 1_000);
    document.addEventListener('visibilitychange', updateFromDeadline);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', updateFromDeadline);
    };
  }, [questionBank, session?.deadlineAt, session?.status]);

  const start = useCallback((identity: StudentIdentity) => {
    const now = Date.now();
    setClockNow(now);
    const selected = selectBalancedQuestions(questionBank, questionCount);
    setSession(createExamSession({
      questions: selected,
      identity: {
        name: identity.name.trim(),
        className: identity.className.trim(),
        school: identity.school.trim(),
      },
      startedAt: now,
      durationMs,
      attemptId: createAttemptId(now),
    }));
  }, [durationMs, questionBank, questionCount]);

  const setAnswer = useCallback((questionIndex: number, answer: number) => {
    const now = Date.now();
    setSession(current => {
      if (!current) return current;
      if (current.status === 'active' && now >= current.deadlineAt) {
        return finishExamSession(current, questionBank, now, 'timeout');
      }
      return updateExamAnswer(current, questionIndex, answer, now);
    });
  }, [questionBank]);

  const goToQuestion = useCallback((index: number) => {
    const now = Date.now();
    setSession(current => {
      if (!current) return current;
      if (current.status === 'active' && now >= current.deadlineAt) {
        return finishExamSession(current, questionBank, now, 'timeout');
      }
      return setExamCurrentIndex(current, index, now);
    });
  }, [questionBank]);

  const finish = useCallback((reason: ExamCompletionReason = 'submitted') => {
    const now = Date.now();
    setClockNow(now);
    setSession(current => {
      if (!current) return current;
      const completionReason = current.status === 'active' && now >= current.deadlineAt
        ? 'timeout'
        : reason;
      return finishExamSession(current, questionBank, now, completionReason);
    });
  }, [questionBank]);

  const reset = useCallback(() => {
    setSession(null);
    setClockNow(Date.now());
  }, []);

  return {
    session,
    questions,
    remainingSeconds: session?.status === 'active'
      ? getRemainingSeconds(session.deadlineAt, clockNow)
      : 0,
    start,
    setAnswer,
    goToQuestion,
    finish,
    reset,
  };
}
