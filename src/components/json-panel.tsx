import { Check, Copy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { JsonView, collapseAllNested, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useTheme } from '../hook/use-theme';

type JsonPanelProps = {
  data: unknown;
};

export function JsonPanel({ data }: JsonPanelProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const serializedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(serializedData);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="p-4 text-sm">
      <div className="mb-3 flex justify-end">
        <button
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-bg text-text transition hover:border-primary hover:text-primary"
          onClick={handleCopy}
          title={copied ? 'Copiado' : 'Copiar JSON'}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <div className="surface max-h-[420px] overflow-auto rounded-lg p-4">
        <JsonView
          clickToExpandNode
          data={data as object}
          shouldExpandNode={collapseAllNested}
          style={theme === 'light' ? defaultStyles : darkStyles}
        />
      </div>
    </div>
  );
}
