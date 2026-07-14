import { AnimatePresence, motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../hook/use-theme';
import { Button } from './button';
import { THEME_OPTIONS } from '../constants/theme-options';

export function ThemeMenu() {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
          aria-label="Alternar tema"
          variant='outline'
          onClick={() => setOpen((current) => !current)}
          className="relative z-50"
        >
          <Palette className="size-5 text-(--color-primary)" />
        </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-0 z-40 mt-4 w-56 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-text)_15%,transparent)] bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-bg)_95%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent))] p-4 shadow-[0_20px_60px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.25 }}
          >../prompt
            <nav className="relative flex max-h-75 flex-col gap-2 overflow-auto scroll-div">
              {THEME_OPTIONS.map((option) => (
                <button
                  className={twMerge(
                    'cursor-pointer rounded-lg px-4 py-2 text-left font-medium text-(--color-text) transition-all',
                    'hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] hover:text-(--color-primary)',
                    theme === option.value &&
                      'bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-primary)',
                  )}
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setOpen(false);
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
