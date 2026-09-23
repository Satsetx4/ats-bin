import type { Game5W1HItem, QuestionItem } from '@/data/types';
import { shuffle } from './exam';

export interface GameProgress {
  version: 1;
  pilahIndex: number;
  pilahScore: number;
  isPilahDone: boolean;
  pendingPilahAdvance: boolean;
  selectedWord: string | null;
  matchedPairs: string[];
  shuffledQuestionWords: string[];
  isGame2Done: boolean;
}

export function restorePracticeAnswers(
  value: unknown,
  questions: readonly QuestionItem[],
): Record<number, number> {
  if (!isRecord(value)) return {};

  const questionById = new Map(questions.map(question => [question.id, question]));
  const restored: Record<number, number> = {};
  for (const [rawId, rawAnswer] of Object.entries(value)) {
    const id = Number(rawId);
    const question = questionById.get(id);
    if (question && Number.isInteger(rawAnswer) && Number(rawAnswer) >= 0 && Number(rawAnswer) < question.options.length) {
      restored[id] = Number(rawAnswer);
    }
  }
  return restored;
}

export function createInitialGameProgress(
  matchingItems: readonly Game5W1HItem[],
  random: () => number = Math.random,
): GameProgress {
  return {
    version: 1,
    pilahIndex: 0,
    pilahScore: 0,
    isPilahDone: false,
    pendingPilahAdvance: false,
    selectedWord: null,
    matchedPairs: [],
    shuffledQuestionWords: shuffle(matchingItems, random).map(item => item.qWord),
    isGame2Done: false,
  };
}

export function restoreGameProgress(
  value: unknown,
  questionCount: number,
  matchingItems: readonly Game5W1HItem[],
): GameProgress {
  const initial = createInitialGameProgress(matchingItems);
  if (!isRecord(value) || value.version !== 1) return initial;

  const wordSet = new Set(matchingItems.map(item => item.qWord));
  const words = value.shuffledQuestionWords;
  const matched = value.matchedPairs;
  const matchedWordSet = new Set(Array.isArray(matched) ? matched.filter((word): word is string => typeof word === 'string') : []);
  const questionIndexValid = Number.isInteger(value.pilahIndex)
    && Number(value.pilahIndex) >= 0
    && Number(value.pilahIndex) < questionCount;
  const scoreValid = Number.isInteger(value.pilahScore)
    && Number(value.pilahScore) >= 0
    && Number(value.pilahScore) <= questionCount;
  const pilahDoneValid = typeof value.isPilahDone === 'boolean'
    && (!value.isPilahDone || Number(value.pilahIndex) === questionCount - 1);
  const pendingAdvanceValid = typeof value.pendingPilahAdvance === 'boolean'
    && (value.pendingPilahAdvance ? !value.isPilahDone : (value.isPilahDone || Number(value.pilahScore) <= Number(value.pilahIndex)));
  const orderValid = Array.isArray(words)
    && words.length === wordSet.size
    && words.every(word => typeof word === 'string' && wordSet.has(word))
    && new Set(words).size === wordSet.size;
  const matchesValid = Array.isArray(matched)
    && matched.every(word => typeof word === 'string' && wordSet.has(word))
    && new Set(matched).size === matched.length;
  const selectedWordValid = value.selectedWord === null
    || (typeof value.selectedWord === 'string' && wordSet.has(value.selectedWord) && !matchedWordSet.has(value.selectedWord));
  const gameTwoDoneValid = typeof value.isGame2Done === 'boolean'
    && (value.isGame2Done ? Array.isArray(matched) && matched.length === wordSet.size : !Array.isArray(matched) || matched.length < wordSet.size);

  if (!questionIndexValid || !scoreValid || !pilahDoneValid || !pendingAdvanceValid || !orderValid || !matchesValid || !selectedWordValid || !gameTwoDoneValid) {
    return initial;
  }

  const resumedPilahDone = Boolean(value.isPilahDone)
    || (Boolean(value.pendingPilahAdvance) && Number(value.pilahIndex) + 1 >= questionCount);
  return {
    version: 1,
    pilahIndex: resumedPilahDone
      ? questionCount - 1
      : Number(value.pilahIndex) + Number(Boolean(value.pendingPilahAdvance)),
    pilahScore: Number(value.pilahScore),
    isPilahDone: resumedPilahDone,
    pendingPilahAdvance: false,
    selectedWord: value.selectedWord as string | null,
    matchedPairs: [...matched] as string[],
    shuffledQuestionWords: [...words] as string[],
    isGame2Done: Boolean(value.isGame2Done),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
