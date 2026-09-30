# Verificação final — shell Thirdway

Status: **IMPLEMENTATION COMPLETED / READY FOR VERIFY**.

A integração foi confirmada pelo usuário e aplicada. A rota final é `/`, servida por `src/app/(public)/page.tsx` com shell em `(public)/layout.tsx`. A rota temporária `/shell-preview` foi removida e retorna HTTP 404. A página anterior está preservada em `evidence/original-root-page.tsx.txt`, com hash igual ao baseline.

## Validações

| Check                          | Resultado | Evidência                                                                                                                               |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| npm run format:check           | PASS      | Prettier global                                                                                                                         |
| npm run lint                   | PASS      | ESLint, código zero                                                                                                                     |
| npm run typecheck              | PASS      | Next typegen e tsc, código zero                                                                                                         |
| npm run build                  | PASS      | Next 16.3.6, rotas / e /_not-found, sem colisão                                                                                         |
| Geometria na rota final        | PASS      | evidence/final-static-check.json: 16 larguras, DPR 1, tolerância 1 CSS px, header/logo/painel, seções, containers, menu aberto e footer |
| Interações na rota final       | PASS      | evidence/final-interaction-check.json: menu vazio, teclado, backdrop, foco, scroll lock, breakpoint, clock controlado e reduced motion  |
| Recarregamento com menu aberto | PASS      | Dois ciclos; menu volta fechado, sem scroll lock ou inert residual                                                                      |
| Cleanup em navegação cliente   | PASS      | evidence/interaction-check.json do preview; hashes dos componentes idênticos confirmados no teste final                                 |
| HTTP, console e assets         | PASS      | / retorna 200, /shell-preview retorna 404; sem erros de console/hydration ou assets da rota final                                       |
| Backup e escopo                | PASS      | Página anterior preservada; layout/CSS globais intactos; componentes somente na pasta canônica                                          |

Checks/build sob Node 24.21.0 e npm 11.6.2. Tema claro fixo; ícones e logo em SVG próprio; animações com GSAP 3.15.0, Motion 13.4.3 e Lenis 1.3.26. Não há biblioteca de ícones adicional.

## Critérios de aceite e gates

AC-01–AC-08: **PASS**. G0–G6: **PASS**. Registros detalhados em `evidence/gates.json`; confirmação em `evidence/root-approval.json`.

As alturas dependentes de conteúdo do menu/footer se reduzem intencionalmente, mantendo interiores vazios e os paddings originais. Alturas explícitas dos wrappers são preservadas. Conteúdo comercial, links, cards, vídeos, formulários e analytics não foram migrados; efeitos sobre esses alvos têm exclusão documentada em `mapping.md`.

A inspeção visual complementou as medidas DOM. Capturas da referência em `source-*.png`, do preview em `preview-*.png` e da rota final em `final-*.png`, dentro de `evidence/`. Procedimento de reprodução em `evidence/README.md`.

Pendências: nenhuma no escopo definido. Próximo passo SDD: VERIFY.
