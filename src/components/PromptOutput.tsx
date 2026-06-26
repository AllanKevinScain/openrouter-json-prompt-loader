import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type PromptOutputProps = {
  prompt: string;
};

export function PromptOutput({ prompt }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-ink">Prompt final</h2>
        <button
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-leaf hover:text-moss"
          onClick={handleCopy}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <textarea
        className="min-h-80 w-full resize-y rounded-lg border border-line bg-ink px-4 py-4 font-mono text-sm leading-6 text-paper outline-none focus:border-leaf focus:ring-4 focus:ring-leaf/20"
        readOnly
        value={prompt}
      />
    </section>
  );
}
