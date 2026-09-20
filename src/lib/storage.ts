// Defensive LocalStorage Helper with try/catch

export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      if (typeof window === 'undefined') return fallback;
      const item = window.localStorage.getItem(key);
      if (item === null) return fallback;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`safeStorage.get error for ${key}:`, e);
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`safeStorage.set error for ${key}:`, e);
    }
  },

  remove(key: string): void {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`safeStorage.remove error for ${key}:`, e);
    }
  },

  clearAll(): void {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem('ats_theme');
      window.localStorage.removeItem('ats_muted');
      window.localStorage.removeItem('ats_active_tab');
      window.localStorage.removeItem('ats_exam_history');
      window.localStorage.removeItem('ats_games_score');
    } catch (e) {
      console.warn('safeStorage.clearAll error:', e);
    }
  },
};

export type ThemeMode = 'light' | 'dark';

export function getInitialTheme(): ThemeMode {
  const saved = safeStorage.get<ThemeMode | null>('ats_theme', null);
  if (saved === 'light' || saved === 'dark') return saved;
  // Default to light for Grade 3 SD, but respect system preference if dark
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  safeStorage.set('ats_theme', theme);
}
