# Fase 1 — Mapeamento estrutural

## Entrada

G0 aprovado.

## Atividades

1. Mapear seletores do Header, Main Flow, Footer e seções semânticas em ordem. Para cada seção, separar wrapper externo, container interno e conteúdo descartado. Identificar onde o placeholder de teste entrará uma única vez.
2. Medir a matriz de viewports do contrato. Registrar valores CSS declarados, regra de origem (arquivo/linha ou stylesheet/seletor) e valores computados. Incluir altura/posição de header, offset fixed, z-index, overflow, max-width, largura fluida, gutters e padding/margin por lado das seções. Não promover cada div a componente.
3. Inventariar tema e variações do logo, dimensões, alinhamento e ponto de troca ao rolar. Preservar wordmark como identidade; não copiar slogans nem criar links para ele.
4. Mapear menu: breakpoint, trigger, overlay/offcanvas, lado de entrada, tamanho, transição, backdrop, scroll lock, foco e política de fechamento. Identificar posição do botão de fechar mesmo sem links.
5. Inventariar animações estruturais: seletor/atributo, trigger, targets, propriedades, duração, easing, delay, stagger, início/fim, scrub, pin e estado inicial/final. Para Webflow, correlacionar `data-w-id`, `data-wf-*` e configuração IX2; para GSAP, timelines/ScrollTrigger; para Motion, variants/viewport/whileInView. Atributos `data-scroll` exigem identificar quem os consome.
6. Classificar cada efeito como estrutural (manter) ou conteúdo removido (excluir com motivo). Se um trigger depende de conteúdo removido, redefinir o alvo para o wrapper somente com equivalência registrada; se não houver equivalência demonstrável, marcar BLOCKED.

## Saída

Tabelas de topologia, tokens por breakpoint, estados de menu/logo e catálogo de animações. Cada linha liga fonte → destino → método de verificação.

## Verification Gate G1

- G1.1: todo wrapper semântico tem ordem, seletor e destino; nenhum conteúdo de marketing está na lista de saída.
- G1.2: cada token estrutural tem origem e medidas na matriz completa; valor desconhecido não pode ser aproximado.
- G1.3: menu/logo possuem estados reproduzíveis e evidências; ausência na fonte é documentada.
- G1.4: cada efeito tem consumidor/runtime e alvo válido no shell vazio, ou exclusão por conteúdo; runtime não identificado → BLOCKED.
