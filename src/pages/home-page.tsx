import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Accordion, CodeBlock } from 'safira-ui/react';
import { GenerationStatus } from '../components/generation-status';
import { JsonPanel } from '../components/json-panel';
import { PromptConfigurationPanel } from '../components/prompt-configuration-panel';
import { useGeneratePrompt } from '../hook/use-generate-prompt';
import { useOpenRouterModels } from '../hook/use-openrouter-models';
import type { TaskFormValues } from '../schemas/task-form.schema';
import { getStoredModel, storeModel } from '../utils/model-storage';
import { getStoredApiKey, removeStoredApiKey, storeApiKey } from '../utils/api-key-storage';
import { Text } from '../components/text';

export function HomePage() {
  const [selectedModel, setSelectedModel] = useState(getStoredModel);
  const [apiKey, setApiKey] = useState(getStoredApiKey);
  const [canStoreApiKey, setCanStoreApiKey] = useState(() => Boolean(getStoredApiKey()));
  const {
    data: models = [],
    error: modelsError,
    isFetched: hasLoadedModels,
    isFetching: isLoadingModels,
  } = useOpenRouterModels(apiKey);
  const activeModel = models.find((model) => model.id === selectedModel) ?? models[0];
  const { data, error, generate, isError, isFetching } = useGeneratePrompt(apiKey, activeModel);

  const handleSubmit = (values: TaskFormValues) => {
    generate(values);
  };

  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    storeModel(model);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    if (canStoreApiKey) {
      if (value) {
        storeApiKey(value);
      } else {
        removeStoredApiKey();
      }
    }
  };

  const handleCanStoreApiKeyChange = (canStore: boolean) => {
    setCanStoreApiKey(canStore);
    if (canStore && apiKey) {
      storeApiKey(apiKey);
    }
    if (!canStore) {
      removeStoredApiKey();
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <PromptConfigurationPanel
          apiKey={apiKey}
          canStoreApiKey={canStoreApiKey}
          isGenerating={isFetching}
          isLoadingModels={isLoadingModels}
          isReady={Boolean(apiKey && activeModel)}
          modelDescription={
            activeModel
              ? `Compatível com JSON estruturado · Janela de contexto: ${activeModel.contextWindow} tokens`
              : undefined
          }
          modelError={
            modelsError instanceof Error
              ? modelsError.message
              : hasLoadedModels && models.length === 0
                ? 'O OpenRouter não informou modelos gratuitos compatíveis com JSON estruturado no momento.'
                : undefined
          }
          modelOptions={models.map((model) => ({ label: model.label, searchText: model.label, value: model.id }))}
          selectedModel={activeModel?.id ?? ''}
          onApiKeyChange={handleApiKeyChange}
          onCanStoreApiKeyChange={handleCanStoreApiKeyChange}
          onSelectModel={handleSelectModel}
          onSubmit={handleSubmit}
        />

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

          {data && !isError && !isFetching && (
            <>
              <Accordion open summary="Formato .txt">
                <CodeBlock collapsible={false} defaultLanguage="terminal" terminal={data.finalPrompt} />
              </Accordion>
              <Accordion summary="Formato .json">
                <JsonPanel data={data.finalPromptJson} />
              </Accordion>
            </>
          )}

          {isFetching && <GenerationStatus />}

          {!data && !isFetching && !isError && (
            <div className="border-border rounded-lg border border-dashed p-8">
              <Text className="text-center">O prompt final aparecerá aqui depois da resposta do OpenRouter.</Text>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
