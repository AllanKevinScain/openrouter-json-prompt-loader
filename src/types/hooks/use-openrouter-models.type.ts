export type OpenRouterModel = {
  id: string;
  name: string;
  context_length: number;
  pricing?: {
    prompt?: string;
    completion?: string;
    request?: string;
  };
  architecture?: {
    output_modalities?: string[];
  };
  supported_parameters?: string[];
  reasoning?: {
    supported_efforts?: string[] | null;
    mandatory?: boolean;
  };
  top_provider?: {
    max_completion_tokens?: number | null;
  };
};

export type OpenRouterModelsResponse = {
  data?: OpenRouterModel[];
  error?: { message?: string };
};

export type FreeModelOption = {
  id: string;
  label: string;
  contextWindow: string;
  canDisableReasoning: boolean;
  maxCompletionTokens?: number;
};
