import type { PromptSpecification } from '../../schemas/prompt-specification.schema';
import { promptSpecificationSchema } from '../../schemas/prompt-specification.schema';

export function parsePromptSpecification(content: string): PromptSpecification {
  const normalizedContent = content
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '');

  const parsedContent: unknown = JSON.parse(normalizedContent);

  return promptSpecificationSchema.parse(parsedContent);
}
