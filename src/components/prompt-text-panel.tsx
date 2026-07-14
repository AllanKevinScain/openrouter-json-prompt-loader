import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { PromptTextPanelProps } from '../types/components/prompt-text-panel.type';
import { Button } from './button';

export function PromptTextPanel(props: PromptTextPanelProps) {
  const { prompt } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="p-4">
      <pre className="surface relative flex max-h-105 flex-col gap-4 overflow-auto rounded-lg p-4 whitespace-pre-wrap">
        <div className="sticky top-0 flex justify-end">
          <Button
            variant="outline"
            title={copied ? 'Copiado' : 'Copiar prompt no formato .txt'}
            onClick={handleCopy}
            className="w-auto p-3"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>

        {prompt}
      </pre>
    </div>
  );
}
