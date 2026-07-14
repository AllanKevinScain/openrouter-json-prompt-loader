import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Accordion } from '../components/accordion';
import { GenerationStatus } from '../components/generation-status';
import { JsonPanel } from '../components/json-panel';
import { ModelPicker } from '../components/model-picker';
import { PromptTextPanel } from '../components/prompt-text-panel';
import { TaskForm } from '../components/task-form';
import { useGeneratePrompt } from '../hook/use-generate-prompt';
import type { TaskFormValues } from '../types/prompt';
import { getStoredModel, storeModel } from '../utils/model-storage';
import { Text } from '../components/text';

export function HomePage() {
  const [selectedModel, setSelectedModel] = useState(getStoredModel);
  const { data, error, generate, isError, isFetching } = useGeneratePrompt(selectedModel);

  const handleSubmit = (values: TaskFormValues) => {
    generate(values.taskDescription);
  };

  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    storeModel(model);
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="card group h-fit">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom_right,color-mix(in_srgb,var(--color-primary)_25%,transparent),color-mix(in_srgb,var(--color-secondary)_25%,transparent))] opacity-80 transition group-hover:opacity-100" />

          <div className="relative z-10 space-y-4 p-5">
            <ModelPicker onSelectModel={handleSelectModel} selectedModel={selectedModel} />
            <TaskForm isLoading={isFetching} onSubmit={handleSubmit} />
          </div>
        </div>

        <div className="space-y-5">
          {isError ? (
            <div className="text-text flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
              <div>
                <strong className="block text-red-400">Falha ao gerar o prompt</strong>
                {error instanceof Error ? error.message : 'Erro inesperado ao gerar o prompt.'}
              </div>
            </div>
          ) : null}

          {data && (
            <>
              <Accordion defaultOpen title="Formato .txt">
                <PromptTextPanel prompt={data.finalPrompt} />
              </Accordion>
              <Accordion title="Formato .json">
                <JsonPanel data={data.finalPromptJson} />
              </Accordion>
            </>
          )}

          {!data && isFetching && <GenerationStatus />}

          {!data && !isFetching && (
            <div className="border-border rounded-lg border border-dashed p-8">
              <Text className="text-center">O prompt final aparecerá aqui depois da resposta do OpenRouter.</Text>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
