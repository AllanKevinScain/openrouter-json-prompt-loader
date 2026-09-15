import { Select } from 'safira-ui/react';
import type { PromptConfigurationPanelProps } from '../types/components/prompt-configuration-panel.type';
import { ApiKeyField } from './api-key-field';
import { TaskForm } from './task-form';

export function PromptConfigurationPanel(props: PromptConfigurationPanelProps) {
  const {
    apiKey,
    canStoreApiKey,
    isGenerating,
    isLoadingModels,
    isReady,
    modelDescription,
    modelError,
    modelOptions,
    selectedModel,
    onApiKeyChange,
    onCanStoreApiKeyChange,
    onSelectModel,
    onSubmit,
  } = props;

  return (
    <div className="card group h-fit">
      <div className="pointer-events-none absolute inset-0 z-0 bg-(--color-primary) transition" />
      <div className="relative z-10 space-y-4 p-5">
        <ApiKeyField
          apiKey={apiKey}
          canStore={canStoreApiKey}
          onApiKeyChange={onApiKeyChange}
          onCanStoreChange={onCanStoreApiKeyChange}
        />
        <Select
          description={modelDescription}
          emptyMessage="Nenhum modelo gratuito compatível com JSON encontrado."
          error={modelError}
          label="Modelo gratuito compatível com JSON"
          onValueChange={onSelectModel}
          options={modelOptions}
          placeholder={isLoadingModels ? 'Carregando modelos...' : 'Escolha um modelo compatível'}
          searchable
          searchPlaceholder="Pesquisar modelos"
          value={selectedModel}
        />
        <TaskForm isLoading={isGenerating} isReady={isReady} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
