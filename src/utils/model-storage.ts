const STORAGE_KEY = 'prompt-loader:selected-model';

export const getStoredModel = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem(STORAGE_KEY) ?? '';
};

export const storeModel = (modelId: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, modelId);
};
