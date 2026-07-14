import type { ModelPickerProps } from '../types/components/model-picker.type';
import { OPENROUTER_MODELS } from '../constants/openrouter-models';
import { Text } from './text';

export function ModelPicker(props: ModelPickerProps) {
  const { selectedModel, onSelectModel } = props;
  const activeModel = OPENROUTER_MODELS.find((model) => model.id === selectedModel);

  return (
    <div className="space-y-2">
      <label className="text-text block text-sm font-semibold" htmlFor="openrouter-model">
        Modelo gratuito do OpenRouter
      </label>
      <select
        className="border-border bg-bg text-text focus:border-primary focus:ring-primary/15 w-full rounded-lg border px-3 py-2.5 text-sm transition outline-none focus:ring-4"
        id="openrouter-model"
        onChange={(event) => onSelectModel(event.target.value)}
        value={selectedModel}
      >
        {OPENROUTER_MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.label}
          </option>
        ))}
      </select>
      {activeModel && (
        <Text>
          {activeModel.description}{' '}
          <span className="text-primary font-semibold">{activeModel.contextWindow} contexto</span>
        </Text>
      )}
    </div>
  );
}
