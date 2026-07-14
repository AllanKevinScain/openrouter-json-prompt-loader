import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { AccordionProps } from '../types/components/accordion.type';

export function Accordion(props: AccordionProps) {
  const { title, defaultOpen = true, children } = props;
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
          <h2 className="text-text text-base font-bold">{title}</h2>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="text-text/60 size-4 shrink-0" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              animate={{ height: 'auto', opacity: 1 }}
              className="border-border overflow-hidden border-t"
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
