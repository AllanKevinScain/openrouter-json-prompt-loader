import { useCallback, useEffect, useState } from 'react';
import type { ThemeType } from '../types/theme';
import { DEFAULT_THEME, isThemeType } from '../utils/theme-options';

const STORAGE_KEY = 'prompt-loader:theme';

const getStoredTheme = (): ThemeType => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return isThemeType(stored) ? stored : DEFAULT_THEME;
};

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeType>(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeType) => {
    setThemeState(nextTheme);
  }, []);

  return { setTheme, theme };
};
