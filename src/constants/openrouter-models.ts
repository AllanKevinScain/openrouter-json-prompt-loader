import { OpenRouterModelOption } from '../types/contants/openrouter-models.type';

export const OPENROUTER_MODELS: OpenRouterModelOption[] = [
  {
    id: 'openai/gpt-oss-20b:free',
    label: 'OpenAI: gpt-oss-20b (free)',
    contextWindow: '131K',
    description:
      'O gpt-oss-20b é um modelo de pesos abertos com 21 bilhões de parâmetros, lançado pela OpenAI sob a licença Apache 2.0. Ele utiliza uma arquitetura de Mistura de Especialistas (MoE) com 3,6 bilhões de parâmetros ativos por passagem *forward*, sendo otimizado para inferência de menor latência e implantação em hardware de consumo ou sistemas com uma única GPU. O modelo é treinado no formato de resposta Harmony da OpenAI e oferece suporte à configuração do nível de raciocínio, ao ajuste fino (*fine-tuning*) e a capacidades de agente, incluindo chamada de funções, uso de ferramentas e saídas estruturadas.',
  },
  {
    id: 'google/gemma-4-31b-it:free',
    label: 'Google: Gemma 4 31B Instruct (free)',
    contextWindow: '262K',
    description:
      'O Gemma 4 31B Instruct é um modelo multimodal denso de 30,7 bilhões de parâmetros da Google DeepMind, que aceita entradas de texto e imagem e gera saídas de texto. Ele conta com uma janela de contexto de 256 mil tokens, modo de raciocínio configurável, chamada de funções nativa e suporte multilíngue para mais de 140 idiomas. Destaca-se em tarefas de programação, raciocínio e compreensão de documentos. Licença Apache 2.0.',
  },
  {
    id: 'qwen/qwen3-coder:free',
    label: 'Qwen: Qwen 3 Coder (free Going away 19 de julho de 2026)',
    contextWindow: '1M',
    description:
      'O Qwen3-Coder-480B-A35B-Instruct é um modelo de geração de código do tipo *Mixture-of-Experts* (MoE) desenvolvido pela equipe Qwen. Ele é otimizado para tarefas de codificação orientadas a agentes, como chamada de funções, uso de ferramentas e raciocínio de longo contexto em repositórios. O modelo possui um total de 480 bilhões de parâmetros, com 35 bilhões ativos por passagem *forward* (8 de 160 especialistas). Os preços dos *endpoints* da Alibaba variam de acordo com o tamanho do contexto. Quando uma solicitação ultrapassa 128 mil *tokens* de entrada, aplica-se a tarifa mais alta.',
  },
  {
    id: 'nvidia/nemotron-3-nano-30b-a3b:free',
    label: 'NVIDIA: Nemotron 3 Nano 30B A3B (free)',
    contextWindow: '256K',
    description:
      'O NVIDIA Nemotron 3 Nano 30B A3B é um modelo de linguagem compacto do tipo MoE (Mixture-of-Experts), que oferece eficiência computacional e precisão superiores, permitindo que desenvolvedores criem sistemas de IA agentiva especializados. O modelo é totalmente aberto — incluindo pesos, conjuntos de dados e receitas —, possibilitando que os desenvolvedores o personalizem, otimizem e implantem facilmente em sua própria infraestrutura, garantindo o máximo nível de privacidade e segurança..',
  },
  {
    id: 'tencent/hy3:free',
    label: 'Tencent: Hy3 (free Going away 21 de julho de 2026)',
    contextWindow: '252K',
    description:
      'O Hy3 é um modelo do tipo *Mixture-of-Experts* (Mistura de Especialistas) da Tencent, com 295 bilhões de parâmetros (sendo 21 bilhões ativos e contando com 192 especialistas e roteamento *top-8*), desenvolvido para raciocínio, fluxos de trabalho baseados em agentes e uso em produção no mundo real. Ele oferece níveis configuráveis ​​de esforço de raciocínio: um modo padrão de resposta direta (sem processamento intermediário), além de modos de "cadeia de pensamento" (*chain-of-thought*) de baixa e alta intensidade para lidar com problemas complexos de matemática, programação e tarefas de múltiplas etapas. Com uma janela de contexto de 256 mil *tokens*, o Hy3 é voltado para tarefas de longo alcance, incluindo melhor resolução de correferência, acompanhamento de restrições em diálogos de múltiplos turnos e uma capacidade estável de chamada de ferramentas (*tool-calling*) que funciona de forma consistente em diferentes estruturas de agentes. A Tencent posiciona o modelo como uma opção confiável e de bom custo-benefício para áreas como programação, processamento de documentos, análise financeira, desenvolvimento de jogos e *design* de *frontend*, com forte ênfase em um comportamento fundamentado em evidências e resistente a alucinações: o modelo fornece respostas quando há embasamento e sinaliza a ausência de evidências, em vez de inventar informações.',
  },
];

export const DEFAULT_OPENROUTER_MODEL_ID = OPENROUTER_MODELS[0].id;
