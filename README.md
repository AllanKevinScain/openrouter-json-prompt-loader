# Prompt Codex App

Aplicativo React com Vite para transformar uma descrição de tarefa em uma especificação técnica e em um prompt final pronto para usar no Codex ou em outra CLI de IA.

## Rodando localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` com sua chave do OpenRouter:

```bash
VITE_OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
VITE_OPENROUTER_MODEL=google/gemini-2.5-flash
```

`VITE_OPENROUTER_MODEL` é opcional. Se ele não for definido, o app usa `google/gemini-2.5-flash`.

Modelos alternativos para testar:

- `qwen/qwen3-coder-flash`
- `nvidia/nemotron-nano-9b-v2:free`
- `cohere/north-mini-code:free`

3. Inicie o servidor:

```bash
npm run dev
```

## Observação de segurança

Como a chamada é feita diretamente no frontend, a chave `VITE_OPENROUTER_API_KEY` fica disponível no bundle do navegador. Para produção, prefira um backend/proxy.
