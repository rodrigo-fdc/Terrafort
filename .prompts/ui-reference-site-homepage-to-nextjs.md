# Prompt para geração de skill/workflow: `ui-reference-site-homepage-to-nextjs`

## Contexto

Atue como um Engenheiro de Software e Arquiteto de Soluções especialista em Spec-Driven Development. Sua tarefa é gerar a especificação completa (formato SKILL.md + arquivos de apoio) para uma skill/workflow autônomo chamado **`ui-reference-site-homepage-to-nextjs`**. 

Esta skill será invocada dentro de um projeto Next.js (App Router) e tem como input a **URL de um site de referência**. Seu output é a **Homepage funcional (Landing Page)** dentro de `src/app/`, estruturada através da composição de seções independentes (Hero, Features, Pricing, FAQ, Testimonials) construídas em `src/shared/components/sections/`.

A skill **não** gera o header de navegação, **não** gera primitivos de UI, e **não** gera componentes compostos isolados — todos esses são pré-requisitos que já devem existir no projeto. Ela é estritamente focada na **composição das seções da homepage**, com fidelidade estrutural e de conteúdo à referência.

A skill deve ser agnóstica em relação ao framework de CSS (Tailwind, CSS Modules, Vanilla CSS), orquestrando o layout através das CSS Variables (`--ui-*`, `--nav-*`) já estabelecidas pelas etapas anteriores.

## Princípio Central: Compor Seções e Orquestrar a Rolagem

1. **Compor a partir do que já existe:** O arquivo `page.tsx` atua apenas como orquestrador, empilhando seções (ex: `<HeroSection />`, `<PricingSection />`). Cada seção importa e consome os primitivos (`Button`, `Typography`) e compostos (`PricingCard`, `Accordion`) do repositório já gerado.
2. **Varrer a URL em profundidade para descobrir as seções:** Analisar o DOM e a estrutura de rolagem da referência para fatiar a página em blocos semânticos baseados em quebras de layout, contraste de background ou âncoras.
3. **Fidelidade à referência:** O empilhamento vertical no React deve refletir exatamente a topologia da URL original, respeitando margens assimétricas, sobreposições de z-index e a ordem de apresentação.

## Pré-requisitos Obrigatórios

Esta etapa atua no topo da cadeia do desenvolvimento. A execução deve ser interrompida imediatamente se faltarem as peças estruturais:
- Navegação (Header/Mobile Drawer) em `src/shared/components/navigation/`.
- Primitivos (Button, Tipografia, Badge) em `src/shared/components/ui/`.
- Compostos (Cards, Modais, Accordions) em `src/shared/components/ui/`.
- O arquivo de tokens base (ex: `ui-tokens.css`).

## Entradas e Saídas

**Entradas:**
1. URL do site de referência.
2. Caminho do projeto Next.js (CWD).

**Saídas (Confinadas estritamente a):**
- `src/app/(public)/page.tsx` — A Homepage orquestrando as seções.
- `src/shared/components/sections/` — Os wrappers estruturais de cada área da Landing Page (ex: `hero.component.tsx`, `pricing.component.tsx`).
- `src/app/(public)/_mock-data.ts` — Dados estáticos de demonstração para popular as seções (sem chamadas a APIs ou libs de fake data aleatórias).

## Fluxo de Execução (Passos Obrigatórios)

### Fase 0 — Verificação de Pré-requisitos
1. Valide a existência de primitivos, compostos, componentes de navegação e do arquivo de tokens.
2. Interrompa e oriente o usuário caso faltem blocos estruturais.

### Fase 1 — Inventário de Seções (Varredura da Homepage)
1. Analise a topologia da URL alvo para fatiar a página em faixas horizontais (seções).
2. Monte uma tabela mapeando: `Nome da Seção | Compostos/Primitivos Consumidos | Necessita Mock Data? | Ordem`.

### Fase 2 — Geração de Dados de Demonstração
1. Gere o arquivo `_mock-data.ts` com dados estruturados tipados e plausíveis, baseados no nicho do site de referência, para preencher áreas iterativas (Features, Depoimentos, Planos).

### Fase 3 — Apresentação do Plano
1. Reporte ao usuário o mapa da página (a ordem exata de empilhamento das seções), os mocks que serão gerados e as dependências estruturais consumidas. 
2. Solicite aprovação explícita antes de codificar.

### Fase 4 — Geração de Código
1. Gere as seções em `src/shared/components/sections/`. Separe a lógica interativa para Client Components (`*.client.tsx`) quando necessário, mantendo o máximo de SSR.
2. Monte o `page.tsx` (Server Component) empilhando as seções.

### Fase 5 — Verificação
1. Execute o build.
2. Realize uma conferência de fidelidade visual cruzando o ritmo vertical gerado com a URL original. Emita o relatório final.

## Estrutura de Arquivos da Especificação que Você Deve Gerar

Gere o conteúdo completo para os seguintes arquivos, utilizando blocos de código Markdown para cada um:

- `SKILL.md` (O fluxo principal detalhado com os *gates* de verificação).
- `references/prerequisite-check.md` (Protocolo rigoroso de bloqueio se faltarem componentes base).
- `references/homepage-discovery-protocol.md` (Regras de inspeção para fatiar a landing page em seções semânticas baseadas em background e paddings).
- `references/visual-fidelity-guide.md` (Checklist de espaçamentos verticais, ritmo e empilhamento de z-index entre seções).
- `references/mock-data-patterns.md` (Padrões de tipagem e geração de conteúdo plausível para as seções repetitivas).
- `references/section-composition-patterns.md` (Padrões arquiteturais definindo a separação entre Server e Client Components ao nível de seção no App Router).
- `scripts/extract-sections-inventory.mjs` (Lógica sugerida para um script iterar sobre o DOM extraindo os `<section>` da URL e seus backgrounds computados).