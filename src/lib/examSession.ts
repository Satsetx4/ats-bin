import { calculateExamScore } from './exam';

export const EXAM_SESSION_VERSION = 1;
export const EXAM_SESSION_RETENTION_MS = 24 * 60 * 60 * 1_000;

export interface StudentIdentity {
  name: string;
  className: string;
  school: string;
}

export type ExamCompletionReason = 'submitted' | 'timeout';
export type ExamStatus = 'intro' | 'active' | 'result';

export interface ExamResult {
  correctCount: number;
  total: number;
  score: number;
  completedAt: number;
  reason: ExamCompletionReason;
}

export interface ExamSession {
  version: typeof EXAM_SESSION_VERSION;
  attemptId: string;
  questionIds: number[];
  answers: (number | null)[];
  currentQuestionIndex: number;
  startedAt: number;
  deadlineAt: number;
  updatedAt: number;
  status: 'active' | 'result';
  identity: StudentIdentity;
  result: ExamResult | null;
}

interface QuestionForSession {
  id: number;
  correctAnswer: number;
}

export function createAttemptId(startedAt: number, random: () => number = Math.random): string {
  const date = new Date(startedAt);
  const datePart = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')]
    .join('');
  const maxSuffix = (36 ** 6) - 1;
  const randomValue = Math.max(0, Math.min(maxSuffix, Math.floor(random() * (maxSuffix + 1))));
  const suffix = randomValue.toString(36).toUpperCase().padStart(6, '0');

  return `ATS-${datePart}-${suffix}`;
}

export function createExamSession(input: {
  questions: readonly { id: number }[];
  identity: StudentIdentity;
  startedAt: number;
  durationMs: number;
  attemptId: string;
}): ExamSession {
  const questionIds = input.questions.map(question => question.id);

  return {
    version: EXAM_SESSION_VERSION,
    attemptId: input.attemptId,
    questionIds,
    answers: questionIds.map(() => null),
    currentQuestionIndex: 0,
    startedAt: input.startedAt,
    deadlineAt: input.startedAt + Math.max(0, input.durationMs),
    updatedAt: input.startedAt,
    status: 'active',
    identity: { ...input.identity },
    result: null,
  };
}

export function updateExamAnswer(
  session: ExamSession,
  questionIndex: number,
  answer: number,
  updatedAt: number,
): ExamSession {
  if (session.status !== 'active' || !Number.isInteger(questionIndex)
    || questionIndex < 0 || questionIndex >= session.answers.length
    || !Number.isInteger(answer) || answer < 0 || answer > 3) {
    return session;
  }

  const answers = [...session.answers];
  answers[questionIndex] = answer;
  return { ...session, answers, updatedAt };
}

export function setExamCurrentIndex(session: ExamSession, index: number, updatedAt: number): ExamSession {
  if (session.status !== 'active' || !Number.isInteger(index)) return session;

  return {
    ...session,
    currentQuestionIndex: Math.max(0, Math.min(session.questionIds.length - 1, index)),
    updatedAt,
  };
}

export function getRemainingSeconds(deadlineAt: number, now: number = Date.now()): number {
  return Math.max(0, Math.ceil((deadlineAt - now) / 1_000));
}

export function finishExamSession(
  session: ExamSession,
  questionBank: readonly QuestionForSession[],
  completedAt: number,
  reason: ExamCompletionReason,
): ExamSession {
  if (session.status !== 'active') return session;

  const questions = session.questionIds
    .map(id => questionBank.find(question => question.id === id))
    .filter((question): question is QuestionForSession => question !== undefined);
  const score = calculateExamScore(questions, session.answers);

  return {
    ...session,
    status: 'result',
    updatedAt: completedAt,
    result: {
      ...score,
      total: session.questionIds.length,
      score: session.questionIds.length === 0
        ? 0
        : Math.round((score.correctCount / session.questionIds.length) * 100),
      completedAt,
      reason,
    },
  };
}

export function restoreExamSession(
  value: unknown,
  questionBank: readonly QuestionForSession[],
  now: number = Date.now(),
): ExamSession | null {
  if (!isRecord(value) || value.version !== EXAM_SESSION_VERSION) return null;
  if (typeof value.attemptId !== 'string' || value.attemptId.trim() === '') return null;
  if (!Array.isArray(value.questionIds) || value.questionIds.length === 0
    || !value.questionIds.every(isFiniteNumber)) return null;
  if (new Set(value.questionIds).size !== value.questionIds.length) return null;
  if (!Array.isArray(value.answers) || value.answers.length !== value.questionIds.length
    || !value.answers.every(answer => answer === null || (Number.isInteger(answer) && answer >= 0 && answer <= 3))) {
    return null;
  }
  if (!isFiniteNumber(value.currentQuestionIndex) || !Number.isInteger(value.currentQuestionIndex)
    || value.currentQuestionIndex < 0
    || value.currentQuestionIndex >= value.questionIds.length) return null;
  if (!isFiniteNumber(value.startedAt) || !isFiniteNumber(value.deadlineAt)
    || !isFiniteNumber(value.updatedAt) || value.deadlineAt <= value.startedAt) return null;
  if (now - value.startedAt > EXAM_SESSION_RETENTION_MS) return null;
  if (value.status !== 'active' && value.status !== 'result') return null;
  if (!isStudentIdentity(value.identity)) return null;
  if (!value.questionIds.every(id => questionBank.some(question => question.id === id))) return null;

  if (value.status === 'active' && value.result !== null) return null;
  const result = value.status === 'result' && isExamResult(value.result, value.questionIds.length)
    ? value.result
    : null;
  if (value.status === 'result' && !result) return null;

  const session: ExamSession = {
    version: EXAM_SESSION_VERSION,
    attemptId: value.attemptId,
    questionIds: [...value.questionIds],
    answers: [...value.answers],
    currentQuestionIndex: value.currentQuestionIndex,
    startedAt: value.startedAt,
    deadlineAt: value.deadlineAt,
    updatedAt: value.updatedAt,
    status: value.status,
    identity: { ...value.identity },
    result: result ? { ...result } : null,
  };

  if (session.status === 'active' && now >= session.deadlineAt) {
    return finishExamSession(session, questionBank, now, 'timeout');
  }

  return session;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isStudentIdentity(value: unknown): value is StudentIdentity {
  return isRecord(value)
    && typeof value.name === 'string'
    && value.name.trim() !== ''
    && typeof value.className === 'string'
    && typeof value.school === 'string';
}

function isExamResult(value: unknown, expectedTotal: number): value is ExamResult {
  return isRecord(value)
    && isFiniteNumber(value.correctCount)
    && Number.isInteger(value.correctCount)
    && value.correctCount >= 0
    && value.correctCount <= expectedTotal
    && value.total === expectedTotal
    && isFiniteNumber(value.score)
    && value.score >= 0
    && value.score <= 100
    && isFiniteNumber(value.completedAt)
    && (value.reason === 'submitted' || value.reason === 'timeout');
}
