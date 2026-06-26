import type { PromptSpecification } from '../types/prompt';

const formatList = (items: string[]) => items.map((item) => `- ${item}`).join('\n');

export const buildCodexPrompt = (specification: PromptSpecification) => {
  return [
    'Implemente a seguinte especificação técnica no projeto atual.',
    '',
    `Contexto:\n${specification.contexto}`,
    '',
    `Requisitos:\n${formatList(specification.requisitos)}`,
    '',
    `Não-requisitos:\n${formatList(specification.nao_requisitos)}`,
    '',
    `Critérios de aceite:\n${formatList(specification.criterios_aceite)}`,
    '',
    `Contrato:\n${specification.contrato}`,
    '',
    `Plano de teste:\n${formatList(specification.plano_teste)}`,
    '',
    'Instruções para execução:',
    '- Leia o código existente antes de alterar arquivos.',
    '- Implemente somente o que está descrito na especificação.',
    '- Preserve padrões, arquitetura e estilo do projeto atual.',
    '- Adicione ou ajuste testes compatíveis com o escopo.',
    '- Ao final, informe os arquivos alterados e como validar a entrega.',
  ].join('\n');
};
