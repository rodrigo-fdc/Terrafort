# Descoberta semântica da homepage

## Cobertura

Registre URL inicial/final, data, idioma, tema, viewport, DPR, fontes, imagens e preferência de movimento. Inspecione a homepage inteira, não apenas a primeira dobra. Outras páginas servem somente para esclarecer links/contratos; não acrescente suas seções à home.

Role progressivamente, espere conteúdo lazy e observe alterações de DOM/altura. Declare limites em páginas de scroll infinito. Não envie formulários, aceite contratos ou dispare transações para descobrir estados. Falta de acesso a um estado é UNKNOWN.

## Segmentação

1. Comece por `main > section`, seções aninhadas e filhos diretos do container principal.
2. Use títulos, âncoras, mudança de grid, fundo, padding e finalidade do conteúdo para confirmar os limites.
3. Não crie uma seção para cada `div`. Separe identidade semântica de wrappers puramente estruturais.
4. Background transparente pode revelar a cor/imagem de um ancestral. Capture a cadeia de ancestrais; gradientes e overlays também definem transições visuais.
5. Preserve estruturas atípicas: hero sobreposto, trilha horizontal dentro do scroll vertical, sticky, pin, tabs que alteram altura e elementos que atravessam duas seções.
6. Identifique clones de carrossel e árvores mobile/desktop. Diferencie duplicação técnica de repetição editorial.
7. Exclua header, menu, footer global e overlays da lista de seções novas. Registre-os como contexto de integração.

## Evidência por seção

Registre seletor, ID/âncora, ordem DOM/visual e títulos; limite superior/inferior em coordenadas do documento; padding, margin, gap, min-height, largura máxima, gutters, grid, posição e z-index.
Capture pseudo-elementos, background-image, aspect-ratio, overflow e stacking contexts criados por transform, filter, opacity e isolation.

Para scroll/animação: documente gatilho, intervalo, duração, easing, pin/spacer, scrub, altura reservada, estado inicial/final e comportamento com reduced motion. Uma posição medida durante pin não é a posição natural do documento.

Para conteúdo: registre textos, CTAs, URLs, imagens/alt, proporções e quantidade de itens. Relacione cada slot ao primitivo/composto local que o renderizará.

## Inventário aprovado

Além da tabela do SKILL.md, registre por seção:

- Arquivo proposto e contrato de props.
- Estrutura de wrappers e dependências reutilizadas.
- Variações em breakpoints reais, inclusive mudança de ordem.
- Conteúdo original versus substituições propostas.
- Estados inspecionados e lacunas que bloqueiam a execução.

## Helper

```bash
node .agents/skills/ui-reference-site-homepage-to-nextjs/scripts/extract-sections-inventory.mjs   https://example.com/ --cwd . --executable /caminho/chrome
```

O script requer Puppeteer já disponível no ambiente de inspeção. Não instala pacotes. Emite JSON em stdout e não grava a aplicação.
Extrai `<section>` e candidatos entre filhos diretos de `main`, incluindo backgrounds computados e ancestrais. Faz duas passagens de captura, antes e após scroll limitado, em desktop/mobile.
Não descobre automaticamente todos os breakpoints, interações, seções baseadas apenas em `div`, scroll infinito ou a semântica dos blocos. Revise os candidatos manualmente; o script não aprova o Gate 1.
