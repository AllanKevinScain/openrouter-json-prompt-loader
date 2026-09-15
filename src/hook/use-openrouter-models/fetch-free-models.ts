import type { FreeModelOption, OpenRouterModelsResponse } from '../../types/hooks/use-openrouter-models.type';

const hasZeroPrice = (price?: string): boolean => price !== undefined && Number(price) === 0;

export async function fetchFreeModels(apiKey?: string): Promise<FreeModelOption[]> {
  const response = await fetch('https://openrouter.ai/api/v1/models?output_modalities=text', {
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
  });
  const payload = (await response.json()) as OpenRouterModelsResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || 'Não foi possível carregar os modelos gratuitos do OpenRouter.');
  }

  return (payload.data ?? [])
    .filter((model) => {
      const outputsText = model.architecture?.output_modalities?.includes('text') ?? true;
      return (
        outputsText &&
        model.supported_parameters?.includes('structured_outputs') === true &&
        model.supported_parameters?.includes('max_tokens') === true &&
        (model.id.endsWith(':free') ||
          (hasZeroPrice(model.pricing?.prompt) &&
            hasZeroPrice(model.pricing?.completion) &&
            hasZeroPrice(model.pricing?.request)))
      );
    })
    .map((model) => ({
      id: model.id,
      label: model.name,
      contextWindow: new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(
        model.context_length,
      ),
      canDisableReasoning:
        model.supported_parameters?.includes('reasoning') === true &&
        model.reasoning?.mandatory !== true &&
        (model.reasoning?.supported_efforts === null || model.reasoning?.supported_efforts?.includes('none') === true),
      maxCompletionTokens: model.top_provider?.max_completion_tokens ?? undefined,
    }))
    .sort((first, second) => first.label.localeCompare(second.label, 'pt-BR'));
}
