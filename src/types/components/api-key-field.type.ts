export interface ApiKeyFieldProps {
  apiKey: string;
  canStore: boolean;
  onApiKeyChange: (apiKey: string) => void;
  onCanStoreChange: (canStore: boolean) => void;
}
