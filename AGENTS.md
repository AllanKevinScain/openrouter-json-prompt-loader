# AGENTS.md — Prompt Loader

## Objetivo

Aplicativo React criado com Vite para gerar especificações e prompts a partir de uma tarefa informada pelo usuário.

## Safira UI 3

- Importe `safira-ui/styles.css` antes do CSS do aplicativo para que as camadas do consumidor possam sobrescrever a biblioteca.
- A integração React é opcional e vem de `safira-ui/react`; não importe CSS pelos componentes.
- A propriedade `className` dos componentes Safira é um objeto por parte, nunca uma string. Exemplo: `className={{ button: 'w-full' }}`.
- Preserve os elementos HTML nativos, os nomes acessíveis e os comportamentos de teclado oferecidos pela biblioteca.
- Para customizações visuais, prefira classes Tailwind na parte adequada do componente ou tokens `--sf-*`; não adicione CSS-in-JS.

## Vite 8 e React

- Mantenha `@vitejs/plugin-react` e `@rolldown/plugin-babel` configurados com `reactCompilerPreset()` para preservar o React Compiler.
- Não adicione plugins de bundler sem necessidade comprovada; Vite 8 já usa Rolldown.
- Ativos em `public/` devem ser referenciados com caminhos absolutos a partir da raiz, como `/favicon.svg`.
- Requer Node.js 20.19 ou superior.

## Mudanças

- Leia os arquivos afetados antes de editar e preserve o padrão atual de TypeScript, React e Tailwind.
- Mantenha a chave do OpenRouter fora de logs, mensagens de erro e arquivos versionados.
- Não altere `package-lock.json` sem uma mudança real de dependência.
- Execute lint ou build somente quando solicitado explicitamente.
