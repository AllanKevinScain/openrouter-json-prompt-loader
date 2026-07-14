import { CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { steps } from '../constants/generation-status';
import { Text } from './text';
import { twMerge } from 'tailwind-merge';

export function GenerationStatus() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeStepIndex = steps.reduce((activeIndex, step, index) => {
    return elapsedSeconds >= step.afterSeconds ? index : activeIndex;
  }, 0);

  return (
    <section className="card p-5">
      <div className="border-border flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-text text-lg font-bold">Gerando prompt</h2>
          <Text>Tempo decorrido: {elapsedSeconds}s</Text>
        </div>
        <div className="bg-primary/10 text-primary inline-flex min-h-9 items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold">
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
              className={twMerge(
                'flex gap-3 rounded-lg border p-3 transition',
                isActive ? 'border-primary/40 bg-primary/10' : 'border-border surface',
              )}
              key={step.label}
            >
              <div
                className={twMerge(
                  'flex size-9 shrink-0 items-center justify-center rounded-lg',
                  isDone || isActive ? 'bg-primary text-white' : 'surface text-text/45',
                )}
              >
                {isDone ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
              </div>
              <div>
                <Text className="font-bold">{step.label}</Text>
                <Text className="mt-1">{step.detail}</Text>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
