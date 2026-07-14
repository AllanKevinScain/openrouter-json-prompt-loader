import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../hook/use-theme';
import { Button } from '../button';
import { JsonPanelProps } from '../../types/components/json-panel.type';
import { JsonPanelComponent } from './json-component';

export function JsonPanel(props: JsonPanelProps) {
  const { data } = props;
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const serializedData = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(serializedData);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="p-4">
      <pre className="surface relative flex max-h-105 flex-col gap-4 overflow-auto rounded-lg p-4 font-mono">
        <div className="sticky top-0 flex justify-end">
          <Button
            variant="outline"
            title={copied ? 'Copiado' : 'Copiar prompt no formato .json'}
            onClick={handleCopy}
            className="w-auto p-3"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>

        <JsonPanelComponent data={data} theme={theme} />
      </pre>
    </div>
  );
}
