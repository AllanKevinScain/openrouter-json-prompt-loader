export const responseFormat = {
  type: 'json_schema',
  json_schema: {
    name: 'technical_specification',
    strict: true,
    schema: {
      type: 'object',
      additionalProperties: false,
      required: [
        'contexto',
        'requisitos',
        'nao_requisitos',
        'criterios_aceite',
        'contrato',
        'plano_teste',
      ],
      properties: {
        contexto: {
          type: 'string',
        },
        requisitos: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        nao_requisitos: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        criterios_aceite: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        contrato: {
          type: 'string',
        },
        plano_teste: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};