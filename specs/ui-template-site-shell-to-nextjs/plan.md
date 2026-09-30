# Plano técnico

SiteShell Server Component compõe Header client, main com SectionWrapper server e Footer server. Hook local é dono do estado do menu; MobileMenu client usa Motion e botão do Header. SectionWrapper aceita atributos DOM tipados, className, CSS custom properties de padding e data-header-scheme; não recebe objetos GSAP/Motion no DOM.

CSS Module local preserva tokens e breakpoints; containers vazios substituem conteúdo. Logo em SVG próprio e fonte Waldenburg local. Runtimes comprovados: gsap, motion e lenis; nenhuma biblioteca de ícones.

Separar shell estático de ativação de interações conforme G3/G4. Testes Playwright em evidence/ usando instalação temporária, sem adicionar framework ao produto. G5 requer demonstrar preview, diff concreto para raiz e confirmação antes da integração. G6 só pode passar após isso. Preservar hashes de página/layout/CSS raiz.
