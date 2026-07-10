import { buildCodexPrompt } from './promptBuilder';
import type { PromptGenerationResult, PromptSpecification } from '../types/prompt';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemini-2.5-flash';

const systemMessage = `
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
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    code?: number;
    message?: string;
    metadata?: {
      raw?: string;
      provider_name?: string;
    };
  };
};

const getOpenRouterModel = () => {
  return import.meta.env.VITE_OPENROUTER_MODEL || DEFAULT_MODEL;
};

const readField = (parsed: Record<string, unknown>, aliases: string[]) => {
  for (const alias of aliases) {
    if (parsed[alias] !== undefined) {
      return parsed[alias];
    }
  }

  return undefined;
};

const ensureString = (value: unknown, field: string): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  throw new Error(`A resposta da IA não trouxe "${field}" como texto ou objeto.`);
};

const ensureStringArray = (value: unknown, field: string): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === 'string' ? item : JSON.stringify(item, null, 2),
    );
  }

  if (typeof value === 'string') {
    return [value];
  }

  throw new Error(`A resposta da IA não trouxe "${field}" como lista de textos.`);
};

const parseSpecification = (content: string): PromptSpecification => {
  const cleanedContent = content
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  const parsed = JSON.parse(cleanedContent) as Record<string, unknown>;

  const contexto = readField(parsed, ['contexto', 'context']);
  const requisitos = readField(parsed, ['requisitos', 'requirements']);
  const naoRequisitos = readField(parsed, [
    'nao_requisitos',
    'não_requisitos',
    'naoRequisitos',
    'non_requirements',
  ]);
  const criteriosAceite = readField(parsed, [
    'criterios_aceite',
    'critérios_aceite',
    'criteriosAceite',
    'criterios_de_aceite',
    'acceptance_criteria',
  ]);
  const contrato = readField(parsed, ['contrato', 'contract']);
  const planoTeste = readField(parsed, [
    'plano_teste',
    'planoTeste',
    'plano_de_teste',
    'test_plan',
  ]);

  return {
    contexto: ensureString(contexto, 'contexto'),
    requisitos: ensureStringArray(requisitos, 'requisitos'),
    nao_requisitos: ensureStringArray(naoRequisitos, 'nao_requisitos'),
    criterios_aceite: ensureStringArray(criteriosAceite, 'criterios_aceite'),
    contrato: ensureString(contrato, 'contrato'),
    plano_teste: ensureStringArray(planoTeste, 'plano_teste'),
  };
};

export const generatePrompt = async (
  taskDescription: string,
): Promise<PromptGenerationResult> => {
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
      response_format: {
        type: 'json_object',
      },
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        {
          role: 'user',
          content: `Descrição da tarefa:\n${taskDescription}`,
        },
      ],
    }),
  });

  const payload = (await response.json()) as OpenRouterResponse;

  if (!response.ok) {
    const rawProviderMessage = payload.error?.metadata?.raw;
    const fallbackMessage = payload.error?.message ?? 'Não foi possível gerar o prompt no OpenRouter.';

    if (response.status === 429 || payload.error?.code === 429) {
      throw new Error(
        rawProviderMessage ??
          `O modelo "${model}" está temporariamente limitado no OpenRouter. Tente novamente em alguns instantes ou troque VITE_OPENROUTER_MODEL no .env.`,
      );
    }

    throw new Error(rawProviderMessage ?? fallbackMessage);
  }

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('O OpenRouter não retornou conteúdo para montar o prompt.');
  }

  const specification = parseSpecification(content);
  const finalPrompt = buildCodexPrompt(specification);

  return {
    specification,
    finalPrompt,
    finalPromptJson: {
      prompt: finalPrompt,
      specification,
    },
  };
};
