import { Check, Copy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { JsonView, collapseAllNested, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

type JsonPanelProps = {
  data: unknown;
};

export function JsonPanel({ data }: JsonPanelProps) {
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
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition hover:border-leaf hover:text-moss"
          onClick={handleCopy}
          title={copied ? 'Copiado' : 'Copiar JSON'}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <div className="max-h-[420px] overflow-auto rounded-lg bg-paper/50 p-4">
        <JsonView
          clickToExpandNode
          data={data as object}
          shouldExpandNode={collapseAllNested}
          style={defaultStyles}
        />
      </div>
    </div>
  );
}
