import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type AccordionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function Accordion({ title, defaultOpen = true, children }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="card group shadow-lg shadow-black/10">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom_right,color-mix(in_srgb,var(--color-primary)_25%,transparent),color-mix(in_srgb,var(--color-secondary)_25%,transparent))] opacity-80 transition group-hover:opacity-100" />

      <div className="relative z-10">
        <button
          aria-expanded={open}
          className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <h2 className="text-base font-bold text-text">{title}</h2>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-4 shrink-0 text-text/60" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              animate={{ height: 'auto', opacity: 1 }}
              className="overflow-hidden border-t border-border"
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
