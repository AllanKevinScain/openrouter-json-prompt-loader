import { DEFAULT_OPENROUTER_MODEL_ID, OPENROUTER_MODELS } from '../constants/openrouter-models';

const STORAGE_KEY = 'prompt-loader:selected-model';

const isKnownModel = (modelId: string | null): modelId is string => {
  return OPENROUTER_MODELS.some((model) => model.id === modelId);
};

export const getStoredModel = (): string => {
  if (typeof window === 'undefined') {
    return DEFAULT_OPENROUTER_MODEL_ID;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  return isKnownModel(stored) ? stored : DEFAULT_OPENROUTER_MODEL_ID;
};

export const storeModel = (modelId: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, modelId);
};
