import type { ThemeType } from '../types/theme';

export type ThemeOption = {
  value: ThemeType;
  label: string;
};

export const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'rocketseat', label: 'Rocketseat' },
  { value: 'minecraft', label: 'Minecraft' },
  { value: 'alura', label: 'Alura' },
  { value: 'instagram', label: 'Instagram' },
];

export const DEFAULT_THEME: ThemeType = 'dark';

export const isThemeType = (value: string | null): value is ThemeType => {
  return THEME_OPTIONS.some((option) => option.value === value);
};
