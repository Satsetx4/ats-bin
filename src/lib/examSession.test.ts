import { describe, expect, it } from 'vitest';
import { questionBankData } from '@/data/learningData';
import {
  createAttemptId,
  createExamSession,
  finishExamSession,
  getRemainingSeconds,
  restoreExamSession,
  setExamCurrentIndex,
  updateExamAnswer,
  type StudentIdentity,
} from './examSession';

const student: StudentIdentity = {
  name: 'Nara',
  className: '3A',
  school: 'SD Contoh',
};

describe('exam session helpers', () => {
  it('creates a readable attempt ID once from the attempt start time', () => {
    expect(createAttemptId(new Date(2026, 8, 23, 12).getTime(), () => 0.5))
      .toMatch(/^ATS-20260923-[A-Z0-9]{6}$/);
  });

  it('restores the selected questions, answers, and current index', () => {
    const questions = questionBankData.slice(0, 3);
    const started = createExamSession({
      questions,
      identity: student,
      startedAt: 1_000,
      durationMs: 60_000,
      attemptId: 'ATS-20260923-ABC123',
    });
    const answered = updateExamAnswer(started, 1, 2, 2_000);
    const navigated = setExamCurrentIndex(answered, 1, 3_000);

    const restored = restoreExamSession(JSON.parse(JSON.stringify(navigated)), questionBankData, 4_000);

    expect(restored).toMatchObject({
      attemptId: 'ATS-20260923-ABC123',
      questionIds: questions.map(question => question.id),
      answers: [null, 2, null],
      currentQuestionIndex: 1,
      startedAt: 1_000,
      deadlineAt: 61_000,
      status: 'active',
      identity: student,
    });
  });

  it('calculates remaining time from the deadline after a long background pause', () => {
    expect(getRemainingSeconds(900_000, 120_000)).toBe(780);
    expect(getRemainingSeconds(900_000, 901_000)).toBe(0);
  });

  it('restores an expired attempt as a timed-out result', () => {
    const questions = questionBankData.slice(0, 2);
    const session = createExamSession({
      questions,
      identity: student,
      startedAt: 1_000,
      durationMs: 1_000,
      attemptId: 'ATS-20260923-ABC123',
    });

    const restored = restoreExamSession(session, questionBankData, 2_000);

    expect(restored).toMatchObject({
      status: 'result',
      result: { reason: 'timeout', correctCount: 0, total: 2, score: 0 },
    });
  });

  it('finishes an active attempt only once', () => {
    const session = createExamSession({
      questions: questionBankData.slice(0, 2),
      identity: student,
      startedAt: 1_000,
      durationMs: 60_000,
      attemptId: 'ATS-20260923-ABC123',
    });
    const completed = finishExamSession(session, questionBankData, 2_000, 'submitted');

    expect(finishExamSession(completed, questionBankData, 3_000, 'timeout')).toBe(completed);
  });

  it('discards a session after its one-day retention window', () => {
    const session = createExamSession({
      questions: questionBankData.slice(0, 2),
      identity: student,
      startedAt: 1_000,
      durationMs: 60_000,
      attemptId: 'ATS-20260923-ABC123',
    });

    expect(restoreExamSession(session, questionBankData, 1_000 + 24 * 60 * 60 * 1_000 + 1)).toBeNull();
  });
});
