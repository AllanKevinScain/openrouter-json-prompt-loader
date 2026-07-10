import { AlertCircle } from 'lucide-react';
import { Accordion } from './components/Accordion';
import { GenerationStatus } from './components/GenerationStatus';
import { JsonPanel } from './components/JsonPanel';
import { PromptTextPanel } from './components/PromptTextPanel';
import { TaskForm } from './components/TaskForm';
import { useGeneratePrompt } from './hooks/useGeneratePrompt';
import type { TaskFormValues } from './types/prompt';

function App() {
  const generatePromptMutation = useGeneratePrompt();

  const handleSubmit = (values: TaskFormValues) => {
    generatePromptMutation.mutate(values.taskDescription);
  };

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="h-fit rounded-lg border border-line bg-white p-5 shadow-panel">
            <TaskForm
              isLoading={generatePromptMutation.isPending}
              onSubmit={handleSubmit}
            />
          </div>

          <div className="space-y-5">
            {generatePromptMutation.isError ? (
              <div className="flex gap-3 rounded-lg border border-coral/30 bg-coral/10 p-4 text-sm leading-6 text-ink">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-coral" />
                <div>
                  <strong className="block text-coral">Falha ao gerar o prompt</strong>
                  {generatePromptMutation.error.message}
                </div>
              </div>
            ) : null}

            {generatePromptMutation.isPending ? <GenerationStatus /> : null}

            {generatePromptMutation.data ? (
              <>
                <Accordion defaultOpen title="Prompt">
                  <PromptTextPanel prompt={generatePromptMutation.data.finalPrompt} />
                </Accordion>
                <Accordion defaultOpen title="JSON completo">
                  <JsonPanel data={generatePromptMutation.data.finalPromptJson} />
                </Accordion>
              </>
            ) : !generatePromptMutation.isPending ? (
              <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-sm leading-6 text-ink/65">
                O prompt final aparecerá aqui depois da resposta do OpenRouter.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
