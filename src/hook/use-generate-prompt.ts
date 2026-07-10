import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { parsePromptSpecification } from '../schemas/prompt-specification.schema';
import type { PromptGenerationResult } from '../types/prompt';
import { buildCodexPrompt } from '../utils/build-codex-prompt';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemini-2.5-flash';

const SYSTEM_MESSAGE = `
Você cria especificações técnicas para agentes de programação como Codex.
Retorne somente JSON válido, sem markdown e sem texto adicional.
O JSON deve seguir exatamente este shape:
{
  "contexto": "string",
  "requisitos": ["string"],
  "nao_requisitos": ["string"],
  "criterios_aceite": ["string"],
  "contrato": "string",
  "plano_teste": ["string"]
}
Use português do Brasil, seja específico e evite escopo que não foi solicitado.
`.trim();

type OpenRouterResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: {
    code?: number;
    message?: string;
    metadata?: { raw?: string; provider_name?: string };
  };
};

const getOpenRouterModel = () => import.meta.env.VITE_OPENROUTER_MODEL || DEFAULT_MODEL;

const fetchPromptGeneration = async (taskDescription: string): Promise<PromptGenerationResult> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
  const model = getOpenRouterModel();

  if (!apiKey) {
    throw new Error('Configure VITE_OPENROUTER_API_KEY no arquivo .env antes de gerar prompts.');
  }

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Prompt Loader',
    },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_MESSAGE },
        { role: 'user', content: `Descrição da tarefa:\n${taskDescription}` },
      ],
    }),
  });

  const payload = (await response.json()) as OpenRouterResponse;

  if (!response.ok) {
    const rawProviderMessage = payload.error?.metadata?.raw;
    const fallbackMessage = payload.error?.message || 'Não foi possível gerar o prompt no OpenRouter.';

    if (response.status === 429 || payload.error?.code === 429) {
      throw new Error(
        rawProviderMessage ||
          `O modelo "${model}" está temporariamente limitado no OpenRouter. Tente novamente em alguns instantes ou troque VITE_OPENROUTER_MODEL no .env.`,
      );
    }

    throw new Error(rawProviderMessage || fallbackMessage);
  }

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('O OpenRouter não retornou conteúdo para montar o prompt.');
  }

  const specification = parsePromptSpecification(content);
  const finalPrompt = buildCodexPrompt(specification);

  return {
    specification,
    finalPrompt,
    finalPromptJson: { prompt: finalPrompt, specification },
  };
};

export const useGeneratePrompt = () => {
  const taskDescriptionRef = useRef('');

  const query = useQuery({
    queryKey: ['generate-prompt'],
    queryFn: () => fetchPromptGeneration(taskDescriptionRef.current),
    enabled: false,
    retry: false,
  });

  const generate = (taskDescription: string) => {
    taskDescriptionRef.current = taskDescription;
    void query.refetch();
  };

  return { ...query, generate };
};
