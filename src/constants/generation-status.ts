import { Clock3, Loader2, Send, Sparkles } from 'lucide-react';

export const steps = [
  {
    label: 'Preparando requisição',
    detail: 'Validando a descrição e montando a mensagem para o modelo.',
    icon: Send,
    afterSeconds: 0,
  },
  {
    label: 'Aguardando o OpenRouter',
    detail: 'A solicitação foi enviada e o provedor está processando a resposta.',
    icon: Loader2,
    afterSeconds: 2,
  },
  {
    label: 'Gerando especificação',
    detail: 'O modelo está organizando contexto, requisitos, contrato e testes.',
    icon: Sparkles,
    afterSeconds: 6,
  },
  {
    label: 'Finalizando prompt',
    detail: 'Assim que a resposta chegar, o app valida o JSON e monta o texto para Codex.',
    icon: Clock3,
    afterSeconds: 12,
  },
];