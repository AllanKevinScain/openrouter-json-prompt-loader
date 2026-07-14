import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY } from '../../constants/keys';
import { getStoredTheme } from './get-stored-theme';
import type { ThemeType } from '../../types/hooks/use-theme.type';

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
