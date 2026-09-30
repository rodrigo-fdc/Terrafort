# Mapa fonte → destino

Fonte https://www.thirdway.com/, Chrome, DPR 1, zoom 100%. Evidências DOM atuais em evidence/source-navigation.json e source-topology.json; CSS/JS extraídos em /tmp/thirdway-inspect (header.pretty.js linhas 6347–6715 e site.pretty.css). Capturas existentes do shell em ../ui-template-site-shell-to-nextjs/evidence e matriz source-matrix.json. Recursos reutilizados: logo SVG e Waldenburg medium local. Ícones SVG próprios; nenhuma biblioteca a instalar.

| Token/estado    | Valor comprovado                                                             | Destino               |
| --------------- | ---------------------------------------------------------------------------- | --------------------- |
| Header          | fixed top 0, z40                                                             | navigation.module.css |
| Container       | max1920, padding16/24/32/48 em 0/768/1024/1920                               | CSS                   |
| Top/linha       | 16mobile/20desktop + safe area; linha44                                      | CSS                   |
| Painel          | branco, radius4, desktop172→680; mobile100% max361                           | Header/Motion         |
| Conteúdo        | padding24 18 mobile,23 16 27 desktop                                         | CSS                   |
| Links           | Waldenburg500,28/32px, line1.1, tracking-.06em, padding8/9px; texto cap-trim | NavLink               |
| Ativo           | warm-black60%, match exato                                                   | resolver              |
| Hover           | seta e label translate1em,400ms cubic(.66,.01,.12,.98)                       | CSS                   |
| Cores           | #20221a,#f7f1e9,#d4cdb7, branco                                              | CSS                   |
| Toggle          | 32x32,cream40%→70%,radius2                                                   | Toggle                |
| Painel motion   | .5s cubic(.35,0,.35,1), height auto                                          | Header                |
| Conteúdo motion | opacity .3s, delay abertura .12s                                             | Panel                 |
| Backdrop        | warm-black60%,blur8,.35s linear                                              | Header                |
| Entrada         | GSAP yPercent-120→0,.65s power3.out,delay.15                                 | Header                |
| Scroll          | seção que cobre y44 define scheme; sem compactação/histerese                 | hook                  |
| Desktop         | clock Londres/GMT e CTA fora do painel, 1024+                                | Header                |

Adaptações prévias: descartar cards promocionais e sua altura; menu terá altura intrínseca menor. Focus trap, inert, foco visível e retorno seguro melhoram acessibilidade. Reduced motion elimina deslocamentos. CTA mailto substitui formulário. Relógio conserva horário de Londres/rótulo GMT, cápsulas32×21px com borda2px e fonte16px; sem animação de dígitos. Kerning none e antialiasing extraídos no check de controles; CTA mobile tracking-.04em, desktop22px de altura com seta em cápsula31×22px. Anchors inexistentes na fonte: política técnica do contrato, testada separadamente, sem novos itens reais.
