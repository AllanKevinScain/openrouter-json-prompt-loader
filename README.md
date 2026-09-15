# Prompt Loader

Aplicativo React com Vite para transformar uma descrição de tarefa em uma especificação técnica e em um prompt final pronto para usar no Codex ou em outra CLI de IA.

## Rodando localmente

Requer Node.js 20.19 ou superior. O projeto usa Vite 8 e Safira UI 3.

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm run dev
```

## Uso

Na tela, informe sua chave da API do OpenRouter. O aplicativo pergunta se ela pode ser salva no navegador; sem esse consentimento, a chave fica apenas na memória da sessão atual.

O seletor carrega os modelos de texto gratuitos diretamente da API do OpenRouter e não depende de uma lista fixa. Adicione uma descrição da tarefa e, se desejar, até seis arquivos de texto, Markdown, JSON, CSV ou YAML. Os arquivos são lidos localmente e enviados como conteúdo de referência, sem upload de binários.

## Observação de segurança

Como a chamada é feita diretamente pelo navegador, uma chave salva no dispositivo pode ser acessada por alguém que use o mesmo perfil do navegador. Para um uso compartilhado ou em produção, prefira um backend/proxy seguro.
