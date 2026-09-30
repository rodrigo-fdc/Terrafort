# Spec — Shell Thirdway

Objetivo: recriar somente estrutura responsiva e interações de shell da referência Thirdway em Next.js. Requisitos e tolerâncias são os da skill, AC-01 a AC-08 em seu contrato de verificação, materializados abaixo.

- AC-01: componentes e suporte somente em `src/shared/template/site/`; assets em `public/template/site/`; rotas finas em `(public)`; dependências e specs são alterações permitidas.
- AC-02: Header, seis seções vazias na ordem do mapa e Footer; único texto demonstrativo “Conteúdo da Landing Page”. Menu sem links.
- AC-03: matriz de 16 larguras (375 e B−1/B/B+1 para 400,768,1024,1440,1920), DPR 1, 375×812 e demais ×900; tolerância 1 CSS px computado, CSS declarado exato; sem overflow horizontal. Medir apenas estruturas preservadas, não alturas de conteúdo removido.
- AC-04: tema claro fixo, logo SVG original posicionado e colorido como referência. Preferência escura não altera tema.
- AC-05: botão, Escape, backdrop, foco, scroll lock, resize e unmount funcionais; zero links; fundo inert enquanto modal aberto.
- AC-06: Motion do menu/backdrop e entrada GSAP com parâmetros do mapa; Lenis ativo somente no shell; atributos estruturais consumidos; cleanup e reduced motion funcionais. Efeitos de conteúdo excluídos conforme mapa.
- AC-07: preview em `/shell-preview`; integração final `(public)/page.tsx` somente após confirmação da alteração de `src/app/page.tsx`. Não marcar este AC concluído apenas pelo preview.
- AC-08: format:check, lint, typecheck, build, HTTP 200, navegador sem erros de hydration/console/asset e testes comportamentais aprovados.

Fora do escopo: conteúdo comercial, itens de menu, links, vídeos, analytics, cookies, APIs, formulários, biblioteca UI e design system.
