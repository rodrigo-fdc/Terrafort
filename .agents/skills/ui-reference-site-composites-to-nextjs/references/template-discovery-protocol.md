# Descoberta do template

## Cobertura reproduzível

Registre URL inicial/final, data, viewport, DPR, idioma, tema, fontes carregadas e estado da página. Comece pela URL fornecida; escolha até cinco páginas representativas da mesma origem ligadas a ela. Amplie esse limite quando necessário e declare a cobertura. Não infira ausência em todo o site a partir de uma página.

Role a página para carregar conteúdo lazy e inspecione breakpoints reais. Explore somente ações de leitura reversíveis: abrir/fechar dialogs, expandir accordions, hover, foco e navegação pública. Não envie formulários, compras ou alterações de conta para provocar estados. Estados inacessíveis são UNKNOWN, não ausentes.

## Passada A — Canônica

Procure modais/dialogs, cards, accordions, empty states, toasts, popovers e tooltips. Investigue roles, `aria-expanded`, `aria-controls`, `data-state`, portals e live regions. Toast é uma notificação transitória observada; qualquer `role="status"` não basta. Empty state exige evidência de ausência de conteúdo, não apenas um container vazio.

Overlays podem ser únicos ou estar desmontados inicialmente. Inspecione seus gatilhos seguros manualmente; repetição não é requisito para classificá-los.

## Passada B — Descoberta livre

Agrupe irmãos e ocorrências em outras páginas por árvore de tags, slots, classes estruturais e geometria. Ignore texto e IDs dinâmicos na assinatura; preserve diferenças que alterem layout ou estado. Confirme semanticamente cada candidato.

Exemplos possíveis: pricing-tier, feature-card, testimonial-card, team-member-card e stat-box. O item é o composto; o grid, a seção e a página permanecem fora do escopo. Remova duplicatas de carrossel. Exclua shell, menus, navegação e elementos que sejam apenas primitivos.

## Registro de evidência

Para cada composto confirmado, capture:

- URL, seletor reproduzível, screenshot e fragmento DOM sanitizado.
- Slots, ordem, tags, wrappers, pseudo-elementos e media queries aplicáveis.
- CSS computado do root e filhos relevantes; variantes e estados reproduzidos.
- Primitivos locais por slot e diferenças entre seu DOM e o original.
- Conteúdo por props, dependências necessárias e comportamento de interação.

Classes/minificação não definem o nome público da API. Não copie scripts de terceiros nem handlers inline: reimplemente o comportamento observado.

## Helper

```bash
node .agents/skills/ui-reference-site-composites-to-nextjs/scripts/extract-composites-inventory.mjs   https://example.com/ https://example.com/pricing --cwd .
```

Requer TypeScript do projeto e Puppeteer disponível no ambiente de inspeção; não instala nada. Use `--executable /caminho/chrome` quando necessário. Os nomes dos exports básicos podem ser informados com `--button` e `--typography`.

O JSON em stdout registra candidatos, CSS computado, pseudo-elementos e limitações. Não executa cliques, não percorre links automaticamente e não conhece a semântica do site. Amostragem/truncamento, fontes com falha, páginas extras e estados interativos precisam de inspeção complementar. O agente só aprova o Gate 1 após confirmar o inventário.
