# Fase 1 — Extração de tokens do header e menu

## Entrada

G0 aprovado.

## Atividades

1. Medir a matriz do contrato: geometria, tokens, fonte/peso/line-height/letter-spacing, logo, links, toggle, painel, backdrop, bordas, foco e active state. Anotar CSS declarado e computado com arquivo/regra/seletor de origem.
2. Mapear os estados de scroll e suas transições: condição de entrada/saída, histerese se existente, direção, transparência, cor, altura, sombra/borda, logo e z-index. Distinguir tema global de variação local do header.
3. Capturar breakpoints exatos e regras por largura. Sticky pode depender de ancestral com overflow/transform: registrar contexto, não só position. Medir compensação do fluxo quando fixed.
4. Catalogar animação CSS ou runtime real, propriedade, duração, delay, easing e cleanup esperado. Identificar SVG próprio/biblioteca de ícones; preservar a solução utilizada, sem substituição por semelhança.
5. Observar menu: lateral/tela cheia/painel expansível, modalidade, backdrop, fechamento por link/Escape, scroll lock, foco e transição para desktop. Se houver dropdowns, registrar hover/click/teclado e diferenças touch.
6. Registrar política observável de ativo, atualização de hash/histórico e offset de âncora. Um efeito ausente não deve virar uma animação nova; um ativo ausente pode exigir decisão explícita de design usando tokens existentes, registrada como adaptação funcional exigida pela tarefa.

## Saída

Mapa de tokens e máquina de estados observável, com matriz fonte/destino planejada. Sem valores “parecidos” ou medidas derivadas apenas de screenshots.

## Verification Gate G1

- G1.1: todos os tokens estruturais e estados têm origem e medidas nos breakpoints relevantes.
- G1.2: regras/limiares de scroll, ativo e menu são reproduzíveis; lacuna necessária → BLOCKED.
- G1.3: fontes, logo, ícones e runtimes comprovados; nenhuma dependência escolhida por palpite.
- G1.4: conteúdo descartado e adaptações de acessibilidade/active state estão identificados antes de implementar.
