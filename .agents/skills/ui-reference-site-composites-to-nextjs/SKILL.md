---
name: ui-reference-site-composites-to-nextjs
description: Extrai componentes compostos de uma URL de referência para Next.js App Router, reutilizando primitivos locais e expandindo tokens CSS. Use para cards, modais, accordions, empty states, toasts e padrões próprios do site; não para primitivos, navegação, shell ou páginas.
---

# ui-reference-site-composites-to-nextjs

## Contrato

Entradas: URL de referência e caminho da aplicação (CWD).
Pré-requisito: execução concluída de `ui-reference-site-primitives-to-nextjs`.
Saída: compostos React/TypeScript estrito, variantes CVA, estilos e exports exclusivamente em `src/shared/components/ui/`.

Expanda `ui-tokens.css`; preserve primitivos, tokens e exports existentes. Não gere páginas, seções, navegação, shell, conteúdo de negócio ou primitivos substitutos. Componentes recebem conteúdo por props/slots. A descoberta determina o inventário: a lista canônica não autoriza inventar componentes ausentes.

Use Radix unstyled para overlays e accordions; Sonner para toasts observados. Reaproveite os ícones e a stack CSS existentes. Não transforme todo o kit em Client Components.

## Protocolo de execução

Cada gate termina em PASS ou BLOCKED, com evidência. UNKNOWN não é PASS. Corrija falhas da fase atual antes de avançar. Se faltar acesso, evidência, pré-requisito ou autorização necessária, registre o bloqueio e a ação para retomada; não declare conclusão parcial como sucesso.

Mantenha inventário, decisões, plano e resultados na conversa. Arquivos de evidência persistentes fora do escopo exigem autorização específica. A aprovação de um plano permanece válida enquanto seu escopo não mudar.

### Fase 0 — Pré-requisitos, antes de acessar a URL

Leia [prerequisite-check.md](references/prerequisite-check.md).
Valide diretório, tokens, exports reais de Button e Typography equivalentes, composição/ref, helper `cn()`, CVA, Next.js App Router com `src/` e TypeScript estrito.
Detecte stack, biblioteca de ícones e gerenciador pelo projeto; use npm quando não houver indicação contrária. Leia AGENTS.md e os guias relevantes da versão instalada do Next.js.

**Gate 0:** relatório dos caminhos e contratos verificados. Ausência de diretório, tokens ou primitivos básicos encerra imediatamente a execução, sem navegação, instalação ou geração.

### Fase 1 — Descoberta canônica e livre

Leia [template-discovery-protocol.md](references/template-discovery-protocol.md).
Inspecione DOM, CSS computado e interações em desktop/mobile.
Passada A: modais, cards genéricos, accordions, empty states e toasts; popovers/tooltips quando encontrados.
Passada B: padrões próprios recorrentes, como pricing-tier, feature-card, testimonial-card, team-member-card e stat-box.
O helper [extract-composites-inventory.mjs](scripts/extract-composites-inventory.mjs) produz candidatos, não um inventário aprovado.

Produza a tabela:

| ID / composto | URL + seletor + viewport/estado | Primitivos locais | Variantes | Estrutura e comportamento | Evidência / situação |
| --- | --- | --- | --- | --- | --- |

**Gate 1:** todo item a gerar tem origem reproduzível, contrato de composição e estados observados. Marque ausências somente dentro da cobertura declarada. Se faltar um primitivo vital, bloqueie e encaminhe à skill de primitivos.

### Fase 2 — Especificação e tokens, sem alterar a aplicação

Leia [design-tokens-mapping.md](references/design-tokens-mapping.md).
Especifique props, slots, refs, variantes CVA, estados controlados/não controlados e fronteiras cliente/servidor de cada composto.
Prepare o delta de tokens: propriedade computada, valor exato, origem, token existente reutilizado ou novo nome semântico. Preserve sombras multicamadas, easing, pseudo-elementos e regras responsivas.
Defina o mapa DOM original → JSX → DOM renderizado, incluindo wrappers das bibliotecas.

**Gate 2:** nenhum valor inventado, colisão não resolvida ou incompatibilidade estrutural escondida. Plano de integração CSS viável dentro da pasta permitida; ainda não escrever tokens.

### Fase 3 — Plano e aprovação explícita

Apresente compostos, primitivos reaproveitados, arquivos, tokens, variantes, dependências e versões compatíveis, verificações e limites de cobertura.
Peça aprovação explícita antes de gerar código ou instalar dependências. Se já houver aprovação explícita para esse plano concreto, prossiga sem repetir a pergunta.

A saída padrão é confinada à pasta UI. Instalações alteram `package.json` e lockfile: discrimine esses arquivos e peça autorização pontual para essa exceção. Sem ela, bloqueie componentes cuja dependência esteja ausente. Não instale todas as bibliotecas antecipadamente.
Montar Toaster no layout ou mudar configuração global também exige ampliação explícita de escopo; por padrão exporte o wrapper e documente sua integração pendente.

**Gate 3:** aprovação registrada com escopo exato. Silêncio não autoriza. Novo composto ou nova alteração externa exige revisão apenas do delta.

### Fase 4 — Implementação

1. Instale somente dependências aprovadas e necessárias.
2. Expanda `ui-tokens.css` sem remover ou redefinir tokens existentes.
3. Gere compostos estáticos confirmados e suas variantes CVA.
4. Gere compostos Radix e Toaster somente quando confirmados, seguindo [radix-integration-patterns.md](references/radix-integration-patterns.md).
5. Use primitivos locais por imports diretos, evitando ciclos pelo barrel. Não recrie buttons, badges ou tipografia com estilos paralelos.
6. Aplique `forwardRef` nos elementos focáveis e nos slots que exigem ref. Encaminhe props nativas, eventos e atributos ARIA. Use APIs compostas tipadas, como `Object.assign(CardRoot, { Header: CardHeader })`.
7. Exporte também as partes nomeadas em `index.ts`; preserve exports anteriores. Evite `any`, `@ts-ignore`, HTML interativo aninhado e browser APIs durante SSR.

**Gate 4:** arquivos confinados ao escopo aprovado; todos os compostos consomem primitivos; valores visuais vêm dos tokens; variantes correspondem à referência. Nenhuma página ou componente fora de escopo foi gerado.

### Fase 5 — Verificação e entrega

Execute [fidelity-checklist.md](references/fidelity-checklist.md), typecheck, lint disponível e build do projeto com seu gerenciador (ex.: `npm run build`). Não confunda build bem-sucedido com fidelidade comprovada.
Corrija falhas introduzidas e repita os checks afetados. Se houver bloqueio externo ou falha preexistente, registre comando, diagnóstico e impacto; não marque o gate como aprovado.

**Gate 5:** checks técnicos e matriz de fidelidade aprovados para todos os itens entregues. Sem renderização comparativa, declare fidelidade não verificada.

Relatório final: compostos/exports, primitivos usados, tokens/dependências adicionados, arquivos alterados, evidências por viewport/estado, resultados dos comandos e integração global eventualmente pendente. Não declare Toaster montado se apenas seu wrapper foi exportado.
