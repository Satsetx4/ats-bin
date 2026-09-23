import { describe, expect, it } from 'vitest';
import { questionBankData } from '@/data/learningData';
import { calculateExamScore, selectBalancedQuestions, shuffle } from './exam';

function categoryCounts(items: readonly { category: string }[]): number[] {
  return [...new Set(items.map(item => item.category))]
    .map(category => items.filter(item => item.category === category).length);
}

describe('exam helpers', () => {
  it('shuffles without losing or duplicating any item', () => {
    const items = ['A', 'B', 'C', 'D', 'E'];

    const shuffled = shuffle(items, () => 0.37);

    expect(shuffled).toHaveLength(items.length);
    expect([...shuffled].sort()).toEqual([...items].sort());
    expect(items).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('selects fifteen questions with a balanced spread across all categories', () => {
    const selected = selectBalancedQuestions(questionBankData, 15, () => 0.42);
    const counts = categoryCounts(selected);

    expect(selected).toHaveLength(15);
    expect(new Set(selected.map(question => question.id)).size).toBe(15);
    expect(new Set(selected.map(question => question.category))).toEqual(new Set(['A', 'B', 'C', 'D']));
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });

  it('selects worksheet questions from every category', () => {
    const selected = selectBalancedQuestions(questionBankData, 10, () => 0.17);
    const counts = categoryCounts(selected);

    expect(selected).toHaveLength(10);
    expect(new Set(selected.map(question => question.category))).toEqual(new Set(['A', 'B', 'C', 'D']));
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });

  it('calculates the exam score from correct answers and total questions', () => {
    const questions = questionBankData.slice(0, 3);
    const result = calculateExamScore(questions, [
      questions[0].correctAnswer,
      questions[1].correctAnswer,
      null,
    ]);

    expect(result).toEqual({ correctCount: 2, total: 3, score: 67 });
  });
});
