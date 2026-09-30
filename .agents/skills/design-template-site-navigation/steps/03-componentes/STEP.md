# Fase 3 — Geração de componentes e dados

## Entrada

G2 aprovado.

## Atividades

1. Criar `navigation.config.ts` e os componentes aplicáveis dentro de `src/shared/template/site/navigation/`. Produzir Header, NavLink, Toggle/Drawer conforme a topologia; auxiliares de dropdown, logo ou provider também ficam nessa pasta se realmente necessários.
2. Header e Drawer usam `.map()` sobre os dados e keys estáveis. Reutilizar a mesma origem de itens nas duas superfícies, com filtros explicitamente mapeados. Não duplicar labels/hrefs nem listas em arquivos JSX.
3. Reproduzir tokens e classes por estados. Preferir CSS Modules/escopo local, sem reset global sobre o site. Preservar fonte/logo e max-width/gaps reais. Não ajustar manualmente padding para compensar fonte ainda não carregada.
4. Usar header/nav/lista/âncora/button semanticamente corretos. MenuToggle tem type=button, nome acessível, aria-expanded e aria-controls apontando para ID único. Links têm foco visível; hamburger decorativo não duplica o nome do botão.
5. NavLink distingue rota, anchor e externo conforme contrato; nunca substituir âncora real por div clicável. Ações/disclosures não ficam dentro de links que também navegam; evitar interativos aninhados.
6. Preparar fixture mínima somente no caminho de exemplos autorizado para medir o componente antes do wiring completo. Evitar duplicar header herdado. Não declarar drawer interativo ou active state pronto nesta fase só porque o markup existe.

## Verification Gate G3

- G3.1: diff mostra componentes e suporte exclusivamente na pasta canônica; sem componentes de conteúdo ou sidebar não detectada.
- G3.2: configuração e loops representam integralmente os itens mapeados, sem listas/hrefs hardcoded no JSX.
- G3.3: HTML não tem IDs/interativos duplicados; layout estático atende medidas/tokens do mapa e não duplica compensação fixed.
- G3.4: lint/typecheck passam; fixture renderiza com fonte/assets carregados, sem erro de hidratação; estados ainda não conectados continuam explicitamente pendentes.
