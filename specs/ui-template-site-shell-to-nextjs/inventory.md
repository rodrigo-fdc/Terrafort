# Inventário — Thirdway

Fonte: https://www.thirdway.com/ (capturada em 2026-09-24). HTML e bundles públicos analisados; screenshots e matriz DPR 1 em `evidence/`. Original é Next.js, não Webflow. CSS: `3nqrf99jfxf00.css`; shell: `3_kjnk_cfpbuq.js`; homepage: `3yymbhbqs3m93.js`.

Destino: Next.js 16.3.6, App Router, npm, specs em `specs/`. Raiz existente `src/app/page.tsx`, sem grupo público. Preview reservado: `/shell-preview`. Hashes em `evidence/baseline.json`. Nenhuma autorização de substituição da raiz foi dada.

Tema padrão: claro, warm-white #f7f1e9, warm-black #20221a, cream #d4cdb7, painel branco. As áreas escuras de mídia/footer pertencem ao mesmo tema. Sem alternância de tema. Ícones e logo são SVG próprios; nenhuma biblioteca de ícones a instalar.

Runtimes identificados: Motion (motion.div, animate, transition) no menu; GSAP na entrada do header; Lenis no scroll global com lerp 0.13; ScrollTrigger em efeitos de conteúdo. Fonte de texto do shell: Waldenburg medium.

G0: PASS — fonte renderizada em Chrome, recursos CSS/JS/SVG disponíveis, destino e rota isolada identificados, baseline registrado. Evidências: source-*.png, source-matrix.json e snippets com origem.

## Atualização após confirmação

O usuário confirmou a integração. A raiz agora é `src/app/(public)/page.tsx`, e `/shell-preview` foi removida. O inventário acima registra o estado inicial. Ver `integration.md`.
