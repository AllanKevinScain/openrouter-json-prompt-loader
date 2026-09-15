import { z } from 'zod';

export const promptSpecificationSchema = z
  .object({
    contexto: z.string(),
    requisitos: z.array(z.string()),
    nao_requisitos: z.array(z.string()),
    criterios_aceite: z.array(z.string()),
    contrato: z.string(),
    plano_teste: z.array(z.string()),
  })
  .strict();

export type PromptSpecification = z.infer<typeof promptSpecificationSchema>;

export const promptSpecificationJsonSchema = {
  type: 'object',
  properties: {
    contexto: { type: 'string' },
    requisitos: { type: 'array', items: { type: 'string' } },
    nao_requisitos: { type: 'array', items: { type: 'string' } },
    criterios_aceite: { type: 'array', items: { type: 'string' } },
    contrato: { type: 'string' },
    plano_teste: { type: 'array', items: { type: 'string' } },
  },
  required: ['contexto', 'requisitos', 'nao_requisitos', 'criterios_aceite', 'contrato', 'plano_teste'],
  additionalProperties: false,
} as const;
