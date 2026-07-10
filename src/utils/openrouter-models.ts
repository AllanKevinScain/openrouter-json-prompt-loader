export type OpenRouterModelOption = {
  id: string;
  label: string;
  contextWindow: string;
  description: string;
};

export const OPENROUTER_MODELS: OpenRouterModelOption[] = [
  {
    id: 'openai/gpt-oss-120b:free',
    label: 'OpenAI: gpt-oss-120b (free)',
    contextWindow: '131K',
    description:
      'MoE de 117B com raciocínio configurável e saída estruturada nativa (function calling, structured output). Melhor opção para especificações mais completas e complexas.',
  },
  {
    id: 'google/gemma-4-31b-it:free',
    label: 'Google: Gemma 4 31B Instruct (free)',
    contextWindow: '262K',
    description:
      'Modelo denso da Google DeepMind com function calling nativo e suporte a structured output. Contexto enorme, bom para tarefas descritas com muito detalhe.',
  },
  {
    id: 'z-ai/glm-4.5-air:free',
    label: 'Z.ai: GLM 4.5 Air (free)',
    contextWindow: '131K',
    description:
      'Modelo leve da família GLM 4.5, voltado para agentes, com modo de raciocínio ("thinking mode") controlável. Boa relação entre qualidade e velocidade.',
  },
  {
    id: 'nvidia/nemotron-3-nano-30b-a3b:free',
    label: 'NVIDIA: Nemotron 3 Nano 30B A3B (free)',
    contextWindow: '256K',
    description:
      'MoE compacto e eficiente da NVIDIA, pensado para agentes especializados. Boa opção padrão para respostas rápidas com custo computacional baixo.',
  },
  {
    id: 'openai/gpt-oss-20b:free',
    label: 'OpenAI: gpt-oss-20b (free)',
    contextWindow: '131K',
    description:
      'Versão menor do gpt-oss, otimizada para latência baixa, mas ainda com function calling e structured output. Ideal para iterar rápido em descrições mais simples.',
  },
];

export const DEFAULT_OPENROUTER_MODEL_ID = OPENROUTER_MODELS[0].id;
