import type { SelectOption } from 'safira-ui/react';
import type { TaskFormValues } from '../../schemas/task-form.schema';

export interface PromptConfigurationPanelProps {
  apiKey: string;
  canStoreApiKey: boolean;
  isGenerating: boolean;
  isLoadingModels: boolean;
  isReady: boolean;
  modelDescription?: string;
  modelError?: string;
  modelOptions: SelectOption[];
  selectedModel: string;
  onApiKeyChange: (value: string) => void;
  onCanStoreApiKeyChange: (canStore: boolean) => void;
  onSelectModel: (model: string) => void;
  onSubmit: (values: TaskFormValues) => void;
}
