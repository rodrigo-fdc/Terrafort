# Teste Projeto Template

Base Next.js com página inicial em português, App Router, React, TypeScript strict e Tailwind CSS. Usa Server Components por padrão.

## Requisitos

- Node.js 24 LTS (versão indicada em `.nvmrc`).
- npm 11.

Se usar nvm, execute `nvm install` e `nvm use` antes dos comandos abaixo.

## Instalação

```bash
npm ci
```

Para adicionar ou atualizar dependências, use npm e versione `package-lock.json`.

## Desenvolvimento

```bash
npm run dev
```

Abra <http://localhost:3000>. Edite `src/app/page.tsx` para alterar a página inicial e `src/app/layout.tsx` para ajustar a metadata.

## Validação

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Para aplicar a formatação, execute `npm run format`.

Este bootstrap tem apenas conteúdo estático, sem lógica de negócio ou interações. Não inclui suíte de testes; a verificação inicial usa os checks acima e um smoke test HTTP em produção. Adicione testes de comportamento conforme os fluxos do produto forem definidos.

## Produção local

```bash
npm run build
npm start
```

## Especificação

Veja `specs/bootstrap/` para escopo, plano, tarefas e evidências de verificação. Não são necessárias variáveis de ambiente para esta etapa.
