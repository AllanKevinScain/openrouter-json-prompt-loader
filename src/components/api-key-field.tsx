import type { ApiKeyFieldProps } from '../types/components/api-key-field.type';
import { Field } from 'safira-ui/react';

export function ApiKeyField(props: ApiKeyFieldProps) {
  const { apiKey, canStore, onApiKeyChange, onCanStoreChange } = props;

  return (
    <div className="space-y-2">
      <Field
        autoComplete="off"
        description="Sem sua autorização, a chave é usada apenas nesta sessão e não é gravada."
        id="openrouter-api-key"
        label="Chave da API do OpenRouter"
        placeholder="sk-or-v1-..."
        type="password"
        value={apiKey}
        onChange={(event) => onApiKeyChange(event.target.value.trim())}
      />
      <label className="text-text/70 flex cursor-pointer items-start gap-2 text-sm">
        <input
          checked={canStore}
          className="accent-primary mt-1 size-4"
          type="checkbox"
          onChange={(event) => onCanStoreChange(event.target.checked)}
        />
        <span>Posso salvar esta chave somente neste navegador.</span>
      </label>
    </div>
  );
}
