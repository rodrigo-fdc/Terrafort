# Migração de animações por intenção

Use quando a referência/spec demonstrar animação. Não adicione movimento apenas porque existe uma biblioteca no bundle.

## Contrato

| Página/bloco | Trigger/estado | From → to | Duration/easing | Sequence | Responsive | Intent | Fonte |
| ------------ | -------------- | --------- | --------------- | -------- | ---------- | ------ | ----- |

Consuma análise existente e confira CSS/JS relevante. Distinga ação de usuário, animação dessa ação e decoração autônoma. Registre scroll threshold, scrub/pin/reveal, direction, delay/stagger, repetição e condições de viewport quando observados. Screenshot não determina duração ou gatilho.

Prioridade de reconstrução: CSS → APIs simples React/browser → biblioteca já instalada → dependência nova apenas quando indispensável e permitida no plano. Não importe jQuery, Webflow runtime, GSAP/AOS ou selectors/globals da referência automaticamente.

Use transições CSS para estados simples, observação/local runtime quando necessário e a solução existente para animação mais complexa. Não crie dois controladores de smooth scroll ou listeners globais duplicados. Preserve ownership de animações no layout/section/componente que já as gerencia.

## Progressive enhancement

Texto e conteúdo estrutural são visíveis/acessíveis no render básico. Ative máscaras/transforms/opacidade oculta somente quando a inicialização puder conduzir ao estado final previsível. Falha de JS, ausência de observador ou desmontagem não podem deixar conteúdo preso invisível.

Respeite reduced motion mantendo conteúdo, estado final e interação utilizáveis. Registre adaptações necessárias, sem anunciar como fidelidade literal uma animação removida por conveniência.

## Runtime e verificação

Isole a menor ilha Client, cleanup de listeners/observers/timers/instâncias e respeite navegação/remount/resize. Compare início/fim, gatilho, sequência, easing/duração aproximada e comportamento responsive; verifique reduced motion e fallback sem JS. Tolerâncias e inferências devem ser declaradas. Renderização estática igual não comprova comportamento de scroll.
