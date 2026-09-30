Prompt para geração de skill/workflow: ui-reference-site-composites-to-nextjs
Contexto
Atue como um Engenheiro de Software e Arquiteto de Soluções especialista em Spec-Driven Development. Sua tarefa é gerar a especificação completa (formato SKILL.md + arquivos de apoio) para uma skill/workflow autônomo chamado ui-reference-site-composites-to-nextjs.

Esta skill será invocada dentro de um projeto Next.js (App Router) e tem como input a URL de um site de referência. Seu output são os componentes compostos desse site — peças reutilizáveis de nível médio (modais, pricing cards, feature items, testimonial cards, accordions, etc.) montadas a partir de primitivos.

A skill não gera shell de layout, navegação/menu, primitivos de UI, ou páginas completas.

Ela deve ser agnóstica em relação ao framework de estilização (Tailwind, CSS Modules, Vanilla CSS), utilizando CSS Variables (--ui-*) para injetar os tokens visuais na aplicação, expandindo o arquivo ui-tokens.css previamente criado pela skill de primitivos.

Princípio Central: O Site é a Fonte da Verdade
Cobrir a lista canônica (modais, cards genéricos, accordions, empty states, toasts) se existirem na URL.

Varrer a URL em profundidade (Descoberta Livre) para identificar padrões recorrentes específicos do site (ex: feature-card, pricing-tier, team-member-card, stat-box) e gerá-los como compostos React.

Fidelidade absoluta: O DOM e o CSS computado ditam as regras. Cores, sombras complexas, easings de transição e a estrutura HTML interna devem ser rigorosamente clonados e isolados em CSS Variables, sem "modernizar" a estrutura se isso alterar o layout.

Pré-requisito Obrigatório
Esta skill exige que a etapa anterior de primitivos (ui-reference-site-primitives-to-nextjs) já tenha sido executada. A execução deve ser interrompida imediatamente se o diretório src/shared/components/ui/ não existir, ou se não contiver primitivos básicos (ex: Button, Tipografia) e o arquivo ui-tokens.css. Compostos consomem primitivos; eles não recriam botões ou badges do zero.

Stack Fixa
Next.js App Router com src/.

Estilização Dinâmica: Expansão do arquivo src/shared/components/ui/ui-tokens.css com novas CSS Variables (ex: --ui-card-bg, --ui-modal-shadow). Acoplamento à stack existente via Tailwind, CSS Modules ou Vanilla.

Composição Obrigatória: Importar primitivos locais de src/shared/components/ui/.

Variantes: CVA (class-variance-authority).

Overlays (Modais, Popovers, Tooltips): Usar Radix UI primitives sem estilização (@radix-ui/react-dialog, etc.). A estilização vem 100% dos tokens mapeados.

Toasts: Usar sonner (estilizado via tokens para espelhar a referência).

Tipagem: TypeScript estrito. Uso do padrão de componentes compostos via objeto (ex: Card.Header = CardHeader).

Entradas e Saídas
Entradas:

URL do site de referência.

Caminho do projeto Next.js (CWD).

Saídas (Confinadas estritamente a):

src/shared/components/ui/ — Cada composto coabita a pasta com os primitivos.

src/shared/components/ui/ui-tokens.css — Adição de novos tokens agrupados semanticamente.

src/shared/components/ui/index.ts — Atualizado com re-exports.

Fluxo de Execução (Passos Obrigatórios)
Fase 0 — Verificação de Pré-requisitos
Valide a existência de src/shared/components/ui/ e do arquivo ui-tokens.css.

Liste os primitivos disponíveis (ex: Button, Badge). Se faltarem componentes vitais, interrompa sugerindo a geração prévia dos primitivos.

Detecte a stack de CSS e a biblioteca de ícones em uso no projeto.

Fase 1 — Inventário de Compostos (Varredura Semântica da URL)
Passada A (Canônica): Busque modais, cards, accordions, toasts.

Passada B (Descoberta): Busque estruturas repetitivas (pricing-card, testimonial-card, feature-grid-item).

Monte a tabela de descoberta listando o composto, primitivos que ele consome, variantes visuais e origens.

Fase 2 — Extração de Tokens e Expansão
Extraia o CSS computado específico dos compostos (sombras de cards pesadas, backdrops de modais, paddings internos).

Adicione ao ui-tokens.css expandindo o namespace (ex: --ui-card-elevation: 0 4px 12px rgba(...)).

Mapeie a integração com a stack do projeto (Tailwind config ou classes modulares).

Fase 3 — Apresentação do Plano
Reporte ao usuário: Compostos encontrados, primitivos que serão reaproveitados, tokens extraídos e dependências Radix/Sonner a instalar. Solicite aprovação explícita antes de codificar.

Fase 4 — Geração de Código
Atualize o ui-tokens.css.

Gere os compostos estáticos (Card, EmptyState, PricingCard).

Gere os compostos Radix (Modal, Accordion).

Gere o Toaster (wrapper do Sonner).

Aplique forwardRef em elementos focáveis, "use client" em overlays e garanta a fidelidade estrutural do JSX.

Fase 5 — Verificação
Execute o build. Realize uma conferência baseada no fidelity-checklist.md (garantindo que o JSX reflete o DOM original). Emita o relatório final.

Estrutura de Arquivos da Especificação que Você Deve Gerar
Gere o conteúdo completo para os seguintes arquivos:

SKILL.md (O fluxo principal detalhado com os gates de verificação).

references/prerequisite-check.md (Protocolo rigoroso de bloqueio se faltarem primitivos).

references/template-discovery-protocol.md (Regras de inspeção de DOM para descobrir cards/widgets proprietários).

references/fidelity-checklist.md (Validação pixel-perfect JSX vs DOM).

references/design-tokens-mapping.md (Como expandir o ui-tokens.css com subgrupos semânticos de forma agnóstica).

references/radix-integration-patterns.md (Snippets de modais e accordions unstyled utilizando CSS Variables).

scripts/extract-composites-inventory.mjs (Lógica sugerida para um script Node/Puppeteer identificar blocos visuais repetitivos na URL).

Por favor, forneça o conteúdo de cada um desses arquivos estruturado em blocos de código Markdown.