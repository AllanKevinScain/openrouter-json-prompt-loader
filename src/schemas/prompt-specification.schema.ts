import { z } from 'zod';

export const promptSpecificationSchema = z.object({
  contexto: z.string(),
  requisitos: z.array(z.string()),
  nao_requisitos: z.array(z.string()),
  criterios_aceite: z.array(z.string()),
  contrato: z.string(),
  plano_teste: z.array(z.string()),
});

export type PromptSpecification = z.infer<typeof promptSpecificationSchema>;

type StringField = 'contexto' | 'contrato';
type ArrayField = 'requisitos' | 'nao_requisitos' | 'criterios_aceite' | 'plano_teste';

const STRING_FIELD_ALIASES: Record<StringField, string[]> = {
  contexto: ['contexto', 'context'],
  contrato: ['contrato', 'contract'],
};

const ARRAY_FIELD_ALIASES: Record<ArrayField, string[]> = {
  requisitos: ['requisitos', 'requirements'],
  nao_requisitos: ['nao_requisitos', 'não_requisitos', 'naoRequisitos', 'non_requirements'],
  criterios_aceite: [
    'criterios_aceite',
    'critérios_aceite',
    'criteriosAceite',
    'criterios_de_aceite',
    'acceptance_criteria',
  ],
  plano_teste: ['plano_teste', 'planoTeste', 'plano_de_teste', 'test_plan'],
};

const readAlias = (parsed: Record<string, unknown>, aliases: string[]): unknown => {
  return aliases.reduce<unknown>((found, alias) => {
    return found !== undefined ? found : parsed[alias];
  }, undefined);
};

const toDisplayString = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return value;
};

const toStringArray = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'string' ? item : JSON.stringify(item, null, 2)));
  }

  if (typeof value === 'string') {
    return [value];
  }

  return value;
};

const normalizeSpecificationInput = (parsed: Record<string, unknown>) => {
  const normalized: Record<string, unknown> = {};

  (Object.keys(STRING_FIELD_ALIASES) as StringField[]).forEach((field) => {
    normalized[field] = toDisplayString(readAlias(parsed, STRING_FIELD_ALIASES[field]));
  });

  (Object.keys(ARRAY_FIELD_ALIASES) as ArrayField[]).forEach((field) => {
    normalized[field] = toStringArray(readAlias(parsed, ARRAY_FIELD_ALIASES[field]));
  });

  return normalized;
};

const cleanJsonContent = (content: string): string => {
  return content
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();
};

export const parsePromptSpecification = (content: string): PromptSpecification => {
  const parsed = JSON.parse(cleanJsonContent(content)) as Record<string, unknown>;
  const normalized = normalizeSpecificationInput(parsed);
  const result = promptSpecificationSchema.safeParse(normalized);

  if (!result.success) {
    const [firstIssue] = result.error.issues;
    const field = firstIssue?.path.join('.') || 'especificação';
    throw new Error(`A resposta da IA não trouxe "${field}" no formato esperado.`);
  }

  return result.data;
};
