import { OPENROUTER_MODELS } from '../utils/openrouter-models';

type ModelPickerProps = {
  selectedModel: string;
  onSelectModel: (model: string) => void;
};

export function ModelPicker({ onSelectModel, selectedModel }: ModelPickerProps) {
  const activeModel = OPENROUTER_MODELS.find((model) => model.id === selectedModel);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text" htmlFor="openrouter-model">
        Modelo gratuito do OpenRouter
      </label>
      <select
        className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
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
      {activeModel ? (
        <p className="text-sm leading-6 text-text/65">
          {activeModel.description}{' '}
          <span className="font-semibold text-primary">{activeModel.contextWindow} contexto</span>
        </p>
      ) : null}
    </div>
  );
}
