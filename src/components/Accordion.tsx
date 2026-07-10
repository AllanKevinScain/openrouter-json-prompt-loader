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
    <section className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
      <button
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <h2 className="text-base font-bold text-ink">{title}</h2>
        <ChevronDown
          className={`size-4 shrink-0 text-ink/60 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open ? <div className="border-t border-line">{children}</div> : null}
    </section>
  );
}
