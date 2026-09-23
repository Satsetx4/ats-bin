import { describe, expect, it } from 'vitest';
import { miniGamesData, questionBankData } from '@/data/learningData';
import { createInitialGameProgress, restoreGameProgress, restorePracticeAnswers } from './learningProgress';

describe('learning progress storage', () => {
  it('restores valid practice answers and ignores unknown questions or options', () => {
    const question = questionBankData[0];

    expect(restorePracticeAnswers({ [question.id]: 2, 999: 0, [question.id + 1]: 99 }, questionBankData))
      .toEqual({ [question.id]: 2 });
  });

  it('restores game progress and question order, and rejects invalid state', () => {
    const initial = createInitialGameProgress(miniGamesData.pasangKataTanya, () => 0.5);
    const saved = {
      ...initial,
      pilahIndex: 2,
      pilahScore: 1,
      selectedWord: miniGamesData.pasangKataTanya[0].qWord,
      matchedPairs: [miniGamesData.pasangKataTanya[1].qWord],
    };

    expect(restoreGameProgress(saved, miniGamesData.pilahKalimat.length, miniGamesData.pasangKataTanya)).toEqual(saved);
    expect(restoreGameProgress({ ...saved, pilahScore: 7 }, miniGamesData.pilahKalimat.length, miniGamesData.pasangKataTanya).pilahScore).toBe(0);

    const pending = restoreGameProgress({ ...saved, pendingPilahAdvance: true }, miniGamesData.pilahKalimat.length, miniGamesData.pasangKataTanya);
    expect(pending).toMatchObject({ pilahIndex: 3, pilahScore: 1, pendingPilahAdvance: false });
  });
});
