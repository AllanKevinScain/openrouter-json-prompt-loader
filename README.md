# Prompt Loader

Aplicativo React com Vite para transformar uma descrição de tarefa em uma especificação técnica e em um prompt final pronto para usar no Codex ou em outra CLI de IA.

## Rodando localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` com sua chave do OpenRouter:

```bash
VITE_OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
```

3. Inicie o servidor:

```bash
npm run dev
```

## Escolha do modelo

O modelo usado na geração não é mais configurado por variável de ambiente. Na própria tela, o accordion **"Modelos gratuitos recomendados"** lista alguns modelos gratuitos do OpenRouter (com `:free`) selecionados por se saírem bem gerando especificações técnicas estruturadas — basta escolher um antes de gerar o prompt.

## Observação de segurança

Como a chamada é feita diretamente no frontend, a chave `VITE_OPENROUTER_API_KEY` fica disponível no bundle do navegador. Para produção, prefira um backend/proxy.
