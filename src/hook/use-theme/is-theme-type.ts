import { THEME_OPTIONS } from '../../constants/theme-options';
import type { ThemeType } from '../../types/hooks/use-theme.type';

export const DEFAULT_THEME: ThemeType = 'dark';

export const isThemeType = (value: string | null): value is ThemeType => {
  return THEME_OPTIONS.some((option) => option.value === value);
};
