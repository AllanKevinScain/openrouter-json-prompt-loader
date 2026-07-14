import { PromptSpecification } from '../../schemas/prompt-specification.schema';

export type OpenRouterResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: {
    code?: number;
    message?: string;
    metadata?: { raw?: string; provider_name?: string };
  };
};

export type PromptGenerationResult = {
  specification: PromptSpecification;
  finalPrompt: string;
  finalPromptJson: {
    prompt: string;
    specification: PromptSpecification;
  };
};
