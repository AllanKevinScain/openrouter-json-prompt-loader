# AGENTS.md

## O que é este projeto

**Prompt Codex App** é uma aplicação React + Vite (TypeScript) que transforma a descrição livre de uma tarefa em uma **especificação técnica estruturada** e, a partir dela, em um **prompt final** pronto para ser colado em uma CLI de IA (Codex ou similar) que vá implementar a tarefa em outro projeto.

Fluxo de uso:

1. O usuário digita a descrição da tarefa em um formulário (`TaskForm`).
2. O app envia essa descrição para a API do **OpenRouter** (`src/services/openRouter.ts`), pedindo a um modelo de IA que gere uma especificação técnica em JSON.
3. A especificação recebida é validada/normalizada e usada para montar um **prompt final em texto** (`src/services/promptBuilder.ts`), com instruções de execução para o agente que for implementar.
4. A tela (`App.tsx`) exibe dois blocos JSON: a especificação pura e o prompt final (texto + especificação) embrulhado em JSON, via `JsonPanel`.

A chamada ao OpenRouter é feita diretamente do frontend (chave de API fica no bundle do navegador) — adequado para uso local/pessoal, não para produção sem um backend/proxy.

## Como os dados devem sair (contrato de saída)

O modelo de IA é instruído (`systemMessage` em `src/services/openRouter.ts`) a responder **somente JSON válido**, sem markdown, seguindo exatamente este formato:

```json
{
  "contexto": "string",
  "requisitos": ["string"],
  "nao_requisitos": ["string"],
  "criterios_aceite": ["string"],
  "contrato": "string",
  "plano_teste": ["string"]
}
```

Esse shape é o tipo `PromptSpecification` (`src/types/prompt.ts`):

- `contexto` — string com o contexto da tarefa.
- `requisitos` — lista de strings com o que deve ser feito.
- `nao_requisitos` — lista de strings com o que está fora de escopo.
- `criterios_aceite` — lista de strings com critérios de aceite/validação.
- `contrato` — string descrevendo o contrato técnico (ex.: assinatura de função, schema, API).
- `plano_teste` — lista de strings com o plano de testes.

O parser (`parseSpecification`) é tolerante a variações de nome de campo (aliases em português/inglês, com/sem acento, snake/camelCase — ex. `criterios_aceite`, `critérios_aceite`, `acceptance_criteria`) e a valores que vêm como objeto em vez de string (nesse caso serializa com `JSON.stringify`). Se um campo obrigatório não existir na resposta, uma exceção é lançada.

A partir da especificação validada, `buildCodexPrompt` monta o **prompt final em texto**, concatenando contexto, requisitos, não-requisitos, critérios de aceite, contrato e plano de teste, seguido de instruções fixas de execução para o agente (ler o código antes de alterar, implementar só o escopo descrito, preservar padrões do projeto, adicionar testes, reportar arquivos alterados).

O resultado exposto pela camada de serviço (`PromptGenerationResult`) contém três partes:

- `specification` — o objeto `PromptSpecification`.
- `finalPrompt` — o prompt final em texto puro.
- `finalPromptJson` — `{ prompt, specification }`, ou seja, o prompt final embrulhado em JSON junto com a especificação.

Na UI, ambos `specification` e `finalPromptJson` são renderizados como JSON navegável (`JsonPanel`, baseado em `react-json-view-lite`).

## Como e com que regras o projeto foi construído

- **Stack**: React 18 + Vite 6 + TypeScript, Tailwind CSS para estilo, `@tanstack/react-query` para gerenciar a chamada assíncrona ao OpenRouter (`useGeneratePrompt`), `react-hook-form` + `zod` para o formulário, `lucide-react` para ícones, `react-json-view-lite` para exibir JSON.
- **Modelo de IA**: chamado via API REST do OpenRouter (`https://openrouter.ai/api/v1/chat/completions`), usando `response_format: { type: 'json_object' }` para forçar saída JSON. Modelo default: `google/gemini-2.5-flash`, configurável via `VITE_OPENROUTER_MODEL` no `.env`.
- **Configuração obrigatória**: `.env` com `VITE_OPENROUTER_API_KEY` (chave do OpenRouter). Sem ela, `generatePrompt` lança erro antes de chamar a API.
- **Separação de responsabilidades**:
  - `src/services/openRouter.ts` — integração com a API externa, parsing/validação da resposta.
  - `src/services/promptBuilder.ts` — montagem do texto final do prompt a partir da especificação já validada.
  - `src/hooks/useGeneratePrompt.ts` — encapsula a chamada em uma mutation do React Query.
  - `src/components/*` — UI (formulário, status de geração, painéis de JSON, saída do prompt).
  - `src/types/prompt.ts` — únicas fontes de verdade dos tipos trafegados entre as camadas.
- **Tratamento de erro**: respostas de erro do OpenRouter (incluindo rate limit HTTP 429) são tratadas com mensagens específicas, priorizando `error.metadata.raw` quando disponível.
- **Segurança**: como a chamada é feita direto do frontend, a chave de API fica exposta no bundle do navegador — README já alerta que, para produção, deve-se usar um backend/proxy.

## Convenções para quem for mexer no código (agentes ou humanos)

- Mudanças no formato de saída da IA devem ser feitas em conjunto: `systemMessage` (o que se pede à IA), `parseSpecification` (como se valida/normaliza) e o tipo `PromptSpecification` (o contrato TypeScript) precisam ficar sincronizados.
- Novos campos na especificação exigem atualizar também `buildCodexPrompt`, para que apareçam no prompt final gerado.
- Scripts disponíveis: `npm run dev` (desenvolvimento), `npm run build` (`tsc -b && vite build`), `npm run preview`, `npm run lint` (ESLint).
- Não commitar `.env` (já está no `.gitignore`); usar `.env.example` como referência de variáveis esperadas.
