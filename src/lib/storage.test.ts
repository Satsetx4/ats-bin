import { beforeEach, describe, expect, it, vi } from 'vitest';
import { safeSessionStorage, safeStorage, STORAGE_KEYS } from './storage';

describe('app storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('clears all active and legacy app keys without clearing unrelated site data', () => {
    const appKeys = [
      STORAGE_KEYS.theme,
      STORAGE_KEYS.muted,
      STORAGE_KEYS.activeTab,
      STORAGE_KEYS.examSession,
      STORAGE_KEYS.practiceAnswers,
      STORAGE_KEYS.gameProgress,
      STORAGE_KEYS.legacyStudentName,
      STORAGE_KEYS.legacyStudentClass,
      STORAGE_KEYS.legacyStudentSchool,
      STORAGE_KEYS.legacyExamHistory,
      STORAGE_KEYS.legacyGamesScore,
    ];
    appKeys.forEach(key => window.localStorage.setItem(key, '"value"'));
    window.sessionStorage.setItem(STORAGE_KEYS.examSession, '"session"');
    window.sessionStorage.setItem(STORAGE_KEYS.practiceAnswers, '"practice"');
    window.localStorage.setItem('other-site-data', 'keep');

    safeStorage.clearAll();

    appKeys.forEach(key => expect(window.localStorage.getItem(key)).toBeNull());
    expect(window.sessionStorage.getItem(STORAGE_KEYS.examSession)).toBeNull();
    expect(window.sessionStorage.getItem(STORAGE_KEYS.practiceAnswers)).toBeNull();
    expect(window.localStorage.getItem('other-site-data')).toBe('keep');
  });

  it('returns the fallback for invalid JSON', () => {
    window.localStorage.setItem('broken', '{');

    expect(safeStorage.get('broken', 'fresh')).toBe('fresh');
  });

  it('does not throw when browser storage access is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    expect(() => safeStorage.get('value', null)).not.toThrow();
    expect(() => safeStorage.set('value', true)).not.toThrow();
    expect(() => safeStorage.remove('value')).not.toThrow();
    expect(() => safeSessionStorage.get('value', null)).not.toThrow();
    expect(() => safeStorage.clearAll()).not.toThrow();
  });
});
