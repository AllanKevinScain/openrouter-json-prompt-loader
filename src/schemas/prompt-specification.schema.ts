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
