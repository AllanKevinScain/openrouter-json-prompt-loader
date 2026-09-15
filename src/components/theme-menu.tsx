import { Palette } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../hook/use-theme';
import { Popover } from 'safira-ui/react';
import { THEME_OPTIONS } from '../constants/theme-options';

export function ThemeMenu() {
  const { setTheme, theme } = useTheme();

  return (
    <Popover
      className={{ trigger: 'w-14' }}
      id="theme-menu"
      label={
        <>
          <Palette aria-hidden="true" className="size-5" />
          <span className="sf-visually-hidden">Alternar tema</span>
        </>
      }
      placement="bottom"
      title="Tema"
    >
      <nav aria-label="Opções de tema" className="scroll-div flex max-h-75 flex-col gap-2 overflow-auto">
        {THEME_OPTIONS.map((option) => (
          <button
            className={twMerge(
              'cursor-pointer rounded-lg px-4 py-2 text-left font-medium text-(--color-primary) transition-all',
              'hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
              theme === option.value &&
                'bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-primary)',
            )}
            key={option.value}
            onClick={() => setTheme(option.value)}
            popoverTarget="theme-menu"
            popoverTargetAction="hide"
            type="button"
          >
            {option.label}
          </button>
        ))}
      </nav>
    </Popover>
  );
}
