import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

type PromptTextPanelProps = {
  prompt: string;
};

export function PromptTextPanel({ prompt }: PromptTextPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="p-4 text-sm">
      <div className="mb-3 flex justify-end">
        <button
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-bg text-text transition hover:border-primary hover:text-primary"
          onClick={handleCopy}
          title={copied ? 'Copiado' : 'Copiar prompt'}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="surface max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg px-4 py-4 font-mono text-sm leading-6 text-text">
        {prompt}
      </pre>
    </div>
  );
}
