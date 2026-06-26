import { Check, Copy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { JsonView, collapseAllNested, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

type JsonPanelProps = {
  title: string;
  data: unknown;
};

export function JsonPanel({ title, data }: JsonPanelProps) {
  const [copied, setCopied] = useState(false);

  const serializedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(serializedData);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
      <div className="flex min-h-14 items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="text-base font-bold text-ink">{title}</h2>
        <button
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition hover:border-leaf hover:text-moss"
          onClick={handleCopy}
          title={copied ? 'Copiado' : 'Copiar JSON'}
          type="button"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <div className="max-h-[420px] overflow-auto bg-paper/50 p-4 text-sm">
        <JsonView
          clickToExpandNode
          data={data as object}
          shouldExpandNode={collapseAllNested}
          style={defaultStyles}
        />
      </div>
    </section>
  );
}
