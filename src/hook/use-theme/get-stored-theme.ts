import { STORAGE_KEY } from '../../constants/keys';
import { ThemeType } from '../../types/hooks/use-theme.type';
import { DEFAULT_THEME, isThemeType } from './is-theme-type';

export const getStoredTheme = (): ThemeType => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return isThemeType(stored) ? stored : DEFAULT_THEME;
};
