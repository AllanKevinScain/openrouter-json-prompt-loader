import { CheckCircle2, Clock3, Loader2, Send, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const steps = [
  {
    label: 'Preparando requisição',
    detail: 'Validando a descrição e montando a mensagem para o modelo.',
    icon: Send,
    afterSeconds: 0,
  },
  {
    label: 'Aguardando o OpenRouter',
    detail: 'A solicitação foi enviada e o provedor está processando a resposta.',
    icon: Loader2,
    afterSeconds: 2,
  },
  {
    label: 'Gerando especificação',
    detail: 'O modelo está organizando contexto, requisitos, contrato e testes.',
    icon: Sparkles,
    afterSeconds: 6,
  },
  {
    label: 'Finalizando prompt',
    detail: 'Assim que a resposta chegar, o app valida o JSON e monta o texto para Codex.',
    icon: Clock3,
    afterSeconds: 12,
  },
];

export function GenerationStatus() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeStepIndex = useMemo(() => {
    return steps.reduce((activeIndex, step, index) => {
      return elapsedSeconds >= step.afterSeconds ? index : activeIndex;
    }, 0);
  }, [elapsedSeconds]);

  return (
    <section className="rounded-lg border border-leaf/30 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink">Gerando prompt</h2>
          <p className="text-sm leading-6 text-ink/65">
            Tempo decorrido: {elapsedSeconds}s
          </p>
        </div>
        <div className="inline-flex min-h-9 items-center gap-2 self-start rounded-lg bg-leaf/10 px-3 py-2 text-sm font-semibold text-moss">
          <Loader2 className="size-4 animate-spin" />
          Processando
        </div>
      </div>

      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < activeStepIndex;
          const isActive = index === activeStepIndex;

          return (
            <li
              className={`flex gap-3 rounded-lg border p-3 transition ${
                isActive
                  ? 'border-leaf/40 bg-leaf/10'
                  : 'border-line bg-paper/40'
              }`}
              key={step.label}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                  isDone || isActive ? 'bg-moss text-white' : 'bg-white text-ink/45'
                }`}
              >
                {isDone ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{step.label}</p>
                <p className="mt-1 text-sm leading-6 text-ink/65">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
