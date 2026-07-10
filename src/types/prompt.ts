import type { PromptSpecification } from '../schemas/prompt-specification.schema';
import type { TaskFormValues } from '../schemas/task-form.schema';

export type { PromptSpecification, TaskFormValues };

export type PromptGenerationResult = {
  specification: PromptSpecification;
  finalPrompt: string;
  finalPromptJson: {
    prompt: string;
    specification: PromptSpecification;
  };
};
