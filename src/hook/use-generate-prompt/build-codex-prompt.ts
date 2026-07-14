import type { PromptSpecification } from '../../schemas/prompt-specification.schema';

const formatList = (items: string[]) => items.map((item) => `- ${item}`).join('\n');

export const buildCodexPrompt = (specification: PromptSpecification) => {
  return [
    'Implemente a seguinte especificação técnica no projeto atual.\n',
    `Contexto:\n${specification.contexto}\n`,
    `Requisitos:\n${formatList(specification.requisitos)}\n`,
    `Não-requisitos:\n${formatList(specification.nao_requisitos)}\n`,
    `Critérios de aceite:\n${formatList(specification.criterios_aceite)}\n`,
    `Contrato:\n${specification.contrato}\n`,
    `Plano de teste:\n${formatList(specification.plano_teste)}\n`,
    'Instruções para execução:',
    '- Responda sempre em português, salvo quando o usuário pedir outro idioma.',
    '- Ser direto, organizado e objetivo.',
    '- Não inventar informações. Se algo não estiver claro no contexto, perguntar antes de alterar arquivos.',
    '- Use linguagem clara, direta e objetiva.',
    '- Use palavras óbvias e fáceis de entender.',
    '- Evite termos técnicos desnecessários (quando usar termos técnicos, explique rapidamente).',
    '- Seja prático e vá direto ao ponto.',
    '- Depois de alterações, executar as validações apropriadas.',
    '- Antes de alterar código, entenda a arquitetura existente.',
    '- Leia os arquivos relevantes antes de propor ou aplicar mudanças.',
    '- Faça mudanças pequenas, coesas e fáceis de revisar.',
    '- Não reescreva partes não relacionadas ao pedido.',
    '- Não crie dependências novas sem justificar.',
    '- Sempre que mexer em código crítico, considere impactos de segurança, performance e regressão.',
    '- Não exponha secrets, tokens, chaves privadas, senhas ou dados sensíveis.',
  ].join('\n');
};
