export const STORAGE_KEYS = {
  theme: 'ats_theme',
  muted: 'ats_muted',
  activeTab: 'ats_active_tab',
  examSession: 'ats_exam_session',
  practiceAnswers: 'ats_practice_answers',
  gameProgress: 'ats_game_progress',
  legacyStudentName: 'ats_student_name',
  legacyStudentClass: 'ats_student_class',
  legacyStudentSchool: 'ats_student_school',
  legacyExamHistory: 'ats_exam_history',
  legacyGamesScore: 'ats_games_score',
} as const;

const APP_STORAGE_KEYS = Object.values(STORAGE_KEYS);

function createSafeStorage(storageName: 'localStorage' | 'sessionStorage') {
  return {
    get<T>(key: string, fallback: T): T {
      try {
        if (typeof window === 'undefined') return fallback;
        const item = window[storageName].getItem(key);
        if (item === null) return fallback;
        return JSON.parse(item) as T;
      } catch (error) {
        console.warn(`safeStorage.get error for ${key}:`, error);
        return fallback;
      }
    },

    set<T>(key: string, value: T): void {
      try {
        if (typeof window === 'undefined') return;
        window[storageName].setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`safeStorage.set error for ${key}:`, error);
      }
    },

    remove(key: string): void {
      try {
        if (typeof window === 'undefined') return;
        window[storageName].removeItem(key);
      } catch (error) {
        console.warn(`safeStorage.remove error for ${key}:`, error);
      }
    },
  };
}

export const safeStorage = {
  ...createSafeStorage('localStorage'),

  clearAll(): void {
    APP_STORAGE_KEYS.forEach(key => {
      safeStorage.remove(key);
      safeSessionStorage.remove(key);
    });
  },
};

export const safeSessionStorage = createSafeStorage('sessionStorage');

export type ThemeMode = 'light' | 'dark';

export function getInitialTheme(): ThemeMode {
  const saved = safeStorage.get<ThemeMode | null>(STORAGE_KEYS.theme, null);
  if (saved === 'light' || saved === 'dark') return saved;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  safeStorage.set(STORAGE_KEYS.theme, theme);
}
