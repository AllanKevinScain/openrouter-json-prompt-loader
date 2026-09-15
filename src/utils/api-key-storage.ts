const STORAGE_KEY = 'prompt-loader:openrouter-api-key';

export const getStoredApiKey = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem(STORAGE_KEY) ?? '';
};

export const storeApiKey = (apiKey: string): void => {
  window.localStorage.setItem(STORAGE_KEY, apiKey);
};

export const removeStoredApiKey = (): void => {
  window.localStorage.removeItem(STORAGE_KEY);
};
