# Bootstrap — Teste Projeto Template

## Contexto e objetivo

Criar uma base Next.js funcional neste diretório para evolução orientada por especificações. Nome técnico: `teste-projeto-template`, derivado do diretório atual. Nenhum domínio de produto foi definido.

## Escopo e requisitos

- RF-01: página inicial estática na rota `/`, em português, identificando o projeto.
- RF-02: metadata própria e idioma `pt-BR`.
- RNF-01: App Router, React, TypeScript strict, Tailwind CSS, ESLint, Prettier, `src/`, alias `@/*` e Server Components.
- RNF-02: layout responsivo, HTML semântico e contraste legível.
- RNF-03: npm, Node.js 24 LTS, lockfile e scripts documentados de desenvolvimento e qualidade.

## Fora do escopo

Banco, autenticação, APIs, integrações, regras de negócio e CI/deploy sem plataforma definida.

## Critérios de aceite

- AC-01: `/` responde HTTP 200 em produção e apresenta o nome do projeto.
- AC-02: HTML contém idioma, título e descrição próprios, um `main` e um `h1`; layout usa largura fluida e adapta-se ao espaço disponível.
- AC-03: format:check, lint, typecheck e build passam.
- AC-04: README documenta instalação, desenvolvimento, validação e produção; package-lock.json e versão Node estão presentes.
