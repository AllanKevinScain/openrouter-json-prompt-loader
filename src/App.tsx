import { AlertCircle, Code2 } from 'lucide-react';
import { GenerationStatus } from './components/GenerationStatus';
import { JsonPanel } from './components/JsonPanel';
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
        <header className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-moss">
              <Code2 className="size-4" />
              Prompt Codex
            </div>
            <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Transforme uma tarefa em um prompt técnico pronto para implementação.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-ink/70">
              Descreva o que precisa ser construído e gere uma especificação objetiva com
              contexto, requisitos, contrato, critérios de aceite e plano de teste.
            </p>
          </div>
        </header>

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
                <JsonPanel
                  data={generatePromptMutation.data.specification}
                  title="JSON da especificação"
                />
                <JsonPanel
                  data={generatePromptMutation.data.finalPromptJson}
                  title="Prompt final em JSON"
                />
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
