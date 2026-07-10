# AGENTS.md

## O que é este projeto

**Prompt Loader** é uma aplicação React + Vite (TypeScript) que transforma a descrição livre de uma tarefa em uma **especificação técnica estruturada** e, a partir dela, em um **prompt final** pronto para ser colado em uma CLI de IA (Codex ou similar) que vá implementar a tarefa em outro projeto.

Fluxo de uso:

1. O usuário digita a descrição da tarefa em um formulário (`TaskForm`).
2. O app envia essa descrição para a API do **OpenRouter** (dentro do hook `src/hook/use-generate-prompt.ts`), pedindo a um modelo de IA que gere uma especificação técnica em JSON.
3. A especificação recebida é validada/normalizada com **zod** (`src/schemas/prompt-specification.schema.ts`) e usada para montar um **prompt final em texto** (`src/utils/build-codex-prompt.ts`), com instruções de execução para o agente que for implementar.
4. Antes de gerar, o usuário escolhe o modelo em um `<select>` (`ModelPicker`, lista em `src/utils/openrouter-models.ts`); a escolha é salva no `localStorage` (`src/utils/model-storage.ts`) e recarregada automaticamente na próxima visita.
5. A tela inicial (`src/pages/home-page.tsx`) exibe dois accordions com o resultado: o **prompt** final em texto puro e o **JSON completo** (prompt + especificação), cada um com botão de copiar.

A chamada ao OpenRouter é feita diretamente do frontend (chave de API fica no bundle do navegador) — adequado para uso local/pessoal, não para produção sem um backend/proxy.

## Como os dados devem sair (contrato de saída)

O modelo de IA é instruído (`SYSTEM_MESSAGE` em `src/hook/use-generate-prompt.ts`) a responder **somente JSON válido**, sem markdown, seguindo exatamente este formato:

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

Esse shape é validado pelo schema zod `promptSpecificationSchema` (`src/schemas/prompt-specification.schema.ts`), cujo tipo (`z.infer`) é reexportado como `PromptSpecification` em `src/types/prompt.ts`:

- `contexto` — string com o contexto da tarefa.
- `requisitos` — lista de strings com o que deve ser feito.
- `nao_requisitos` — lista de strings com o que está fora de escopo.
- `criterios_aceite` — lista de strings com critérios de aceite/validação.
- `contrato` — string descrevendo o contrato técnico (ex.: assinatura de função, schema, API).
- `plano_teste` — lista de strings com o plano de testes.

A função `parsePromptSpecification` normaliza variações de nome de campo (aliases em português/inglês, com/sem acento, snake/camelCase — ex. `criterios_aceite`, `critérios_aceite`, `acceptance_criteria`) e valores que vêm como objeto em vez de string (nesse caso serializa com `JSON.stringify`) antes de validar com o schema zod. Se um campo obrigatório não passar na validação, uma exceção com o nome do campo é lançada.

A partir da especificação validada, `buildCodexPrompt` (`src/utils/build-codex-prompt.ts`) monta o **prompt final em texto**, concatenando contexto, requisitos, não-requisitos, critérios de aceite, contrato e plano de teste, seguido de instruções fixas de execução para o agente (ler o código antes de alterar, implementar só o escopo descrito, preservar padrões do projeto, adicionar testes, reportar arquivos alterados).

O resultado exposto pelo hook (`PromptGenerationResult`, em `src/types/prompt.ts`) contém três partes:

- `specification` — o objeto `PromptSpecification`.
- `finalPrompt` — o prompt final em texto puro.
- `finalPromptJson` — `{ prompt, specification }`, ou seja, o prompt final embrulhado em JSON junto com a especificação.

Na UI, `finalPrompt` é renderizado como texto (`PromptTextPanel`) e `finalPromptJson` como JSON navegável (`JsonPanel`, baseado em `react-json-view-lite`), cada um dentro de um `Accordion` independente.

## Como e com que regras o projeto foi construído

- **Stack**: React 19 + Vite 6 + TypeScript, Tailwind CSS v4 para estilo (via `@tailwindcss/vite`), `framer-motion` para animações (accordion, menu de tema), `@tanstack/react-query` (`useQuery`) para a chamada assíncrona ao OpenRouter, `react-hook-form` + `zod` para o formulário, `lucide-react` para ícones, `tailwind-merge` para compor classes condicionais, `react-json-view-lite` para exibir JSON.
- **Tema visual**: o app tem 6 temas trocáveis em tempo real — `light`, `dark` (padrão), `rocketseat`, `minecraft`, `alura` e `instagram` — cada um definindo `--color-bg`, `--color-text`, `--color-primary`, `--color-secondary` e `--color-border` em `src/styles.css` via seletor `[data-theme="..."]`. `src/hook/use-theme.ts` (`useTheme`) lê/persiste o tema escolhido no `localStorage` (`theme`) e aplica o atributo `data-theme` em `document.documentElement`. `src/components/theme-menu.tsx` (`ThemeMenu`) é o botão/dropdown de troca, renderizado no header em `app.tsx`. As opções ficam em `src/utils/theme-options.ts` (`THEME_OPTIONS`) e o tipo em `src/types/theme.ts` (`ThemeType`).
- **Tailwind v4**: `tailwind.config.ts` mapeia os tokens `bg`/`text`/`primary`/`secondary`/`border` para as variáveis CSS acima; `src/styles.css` carrega esse config com `@config "../tailwind.config.ts";` (tem que vir antes de `@import 'tailwindcss';`) e define as classes utilitárias `.card` e `.surface` (superfícies com `color-mix` sobre `--color-bg`/`--color-text`) dentro de `@layer components`. Não há mais `postcss.config.js`/`autoprefixer` — o plugin `@tailwindcss/vite` cuida de tudo no `vite.config.ts`.
- **React Compiler**: configurado via `babel-plugin-react-compiler` como primeiro plugin do Babel em `vite.config.ts` (dentro de `react({ babel: { plugins: [...] } })`). Ele memoiza automaticamente onde necessário, mas não substitui `useState`/`useEffect`/`useRef`/`useContext`, e `useCallback`/`useMemo` explícitos que garantem estabilidade de referência (efeitos, libs externas) devem continuar sendo avaliados caso a caso.
- **Modelo de IA**: chamado via API REST do OpenRouter (`https://openrouter.ai/api/v1/chat/completions`), usando `response_format: { type: 'json_object' }` para forçar saída JSON. Não há mais variável de ambiente para o modelo — o usuário escolhe entre os modelos gratuitos listados em `src/utils/openrouter-models.ts` (`OPENROUTER_MODELS`) através de um `<select>` (`ModelPicker`).
- **Persistência do modelo escolhido**: `src/utils/model-storage.ts` salva o `id` do modelo no `localStorage` (`getStoredModel`/`storeModel`), validando que o valor salvo ainda existe em `OPENROUTER_MODELS`; se não existir (ou não houver nada salvo), cai no `DEFAULT_OPENROUTER_MODEL_ID` (primeiro item da lista). O estado inicial de `HomePage` já nasce com `getStoredModel()`, então o modelo usado na visita anterior volta selecionado automaticamente.
- **Configuração obrigatória**: `.env` com `VITE_OPENROUTER_API_KEY` (chave do OpenRouter). Sem ela, o hook lança erro antes de chamar a API.
- **Chamada via `useQuery`**: `src/hook/use-generate-prompt.ts` usa `useQuery` com `enabled: false` e um `useRef` guardando a última descrição de tarefa; a função `generate(taskDescription)` atualiza o ref e chama `refetch()` — evita `useMutation`, mantendo a chamada dentro do ecossistema do React Query como pedido.
- **Estrutura de pastas** (`src/`):
  - `pages/` — páginas (ex.: `home-page.tsx` → componente `HomePage`).
  - `components/` — componentes de UI reutilizáveis (`accordion.tsx`, `json-panel.tsx`, `prompt-text-panel.tsx`, `task-form.tsx`, `generation-status.tsx`, `model-picker.tsx`, `theme-menu.tsx`).
  - `schemas/` — schemas zod (`prompt-specification.schema.ts`, `task-form.schema.ts`) e os tipos inferidos a partir deles.
  - `types/` — tipos compostos que combinam os schemas (`prompt.ts`) e o tipo do tema (`theme.ts`).
  - `utils/` — funções e dados puros auxiliares (`build-codex-prompt.ts`, `openrouter-models.ts`, `model-storage.ts`, `theme-options.ts`).
  - `hook/` — hooks da aplicação: chamada ao OpenRouter + `useQuery` (`use-generate-prompt.ts`) e o tema (`use-theme.ts`).
- **Convenção de nomes**: arquivos e pastas em `kebab-case`; funções, variáveis e parâmetros em `camelCase`; componentes e tipos em `PascalCase`. Aplicado via ESLint (`eslint-plugin-check-file` + `@typescript-eslint/naming-convention`).
- **Tratamento de erro**: respostas de erro do OpenRouter (incluindo rate limit HTTP 429) são tratadas com mensagens específicas, priorizando `error.metadata.raw` quando disponível.
- **Segurança**: como a chamada é feita direto do frontend, a chave de API fica exposta no bundle do navegador — README já alerta que, para produção, deve-se usar um backend/proxy.

## Regras de lint / formatação (ESLint)

O projeto não usa Prettier — toda a formatação e as convenções de código são aplicadas via ESLint (`eslint.config.js`, flat config). Regras principais:

| Regra | Configuração | O que garante |
| --- | --- | --- |
| `max-lines` | `['error', { max: 120, skipBlankLines: true, skipComments: true }]` | Nenhum arquivo `.ts`/`.tsx` pode passar de **120 linhas** (linhas em branco e comentários não contam). |
| `quotes` | `['error', 'single', { avoidEscape: true }]` | Apenas **aspas simples** em strings. |
| `check-file/filename-naming-convention` | `{ '**/*.{ts,tsx}': 'KEBAB_CASE' }` (com `ignoreMiddleExtensions: true`) | Todo arquivo `.ts`/`.tsx` deve ter o nome em **kebab-case** (ex.: `json-panel.tsx`, `use-generate-prompt.ts`). |
| `check-file/folder-naming-convention` | `{ 'src/**/': 'KEBAB_CASE' }` | Toda pasta dentro de `src/` deve ter o nome em **kebab-case**. |
| `@typescript-eslint/naming-convention` | ver `eslint.config.js` | `function`: `camelCase` ou `PascalCase` (componentes); `variable`: `camelCase`, `PascalCase` ou `UPPER_CASE` (constantes de módulo); `parameter`: `camelCase`; `typeLike` (types/interfaces): `PascalCase`. |
| `react-hooks/*` (recommended) | `eslint-plugin-react-hooks` | Regras padrão de hooks do React (deps de `useEffect`, ordem de chamada, etc.), essencial para o React Compiler funcionar corretamente. |
| `react-refresh/only-export-components` | `warn`, `allowConstantExport: true` | Garante Fast Refresh consistente durante o `npm run dev`. |

Resumindo as convenções de nomenclatura em texto:

- **Arquivos e pastas**: `kebab-case` (ex.: `task-form.tsx`, `prompt-specification.schema.ts`, `src/hook/`).
- **Funções, variáveis, parâmetros e estados**: `camelCase` (ex.: `handleSubmit`, `taskDescriptionRef`, `isFetching`).
- **Componentes e tipos/interfaces**: `PascalCase` (ex.: `HomePage`, `Accordion`, `PromptSpecification`).
- Constantes de módulo que nunca mudam podem ficar em `UPPER_CASE` (ex.: `SYSTEM_MESSAGE`, `OPENROUTER_URL`).

Rodar `npm run lint` para validar tudo isso antes de commitar.

## Convenções para quem for mexer no código (agentes ou humanos)

- Mudanças no formato de saída da IA devem ser feitas em conjunto: `SYSTEM_MESSAGE` (o que se pede à IA), `promptSpecificationSchema`/`parsePromptSpecification` (como se valida/normaliza) e o tipo `PromptSpecification` precisam ficar sincronizados.
- Novos campos na especificação exigem atualizar também `buildCodexPrompt`, para que apareçam no prompt final gerado.
- Scripts disponíveis: `npm run dev` (desenvolvimento), `npm run build` (`tsc -b && vite build`), `npm run preview`, `npm run lint` (ESLint).
- Não commitar `.env` (já está no `.gitignore`); usar `.env.example` como referência de variáveis esperadas.
- Após alterar dependências (`package.json`), rodar `npm install` localmente antes de `npm run dev`/`build`.
