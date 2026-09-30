# Verificação final

Status: IMPLEMENTATION COMPLETED / READY FOR VERIFY.

Chrome, DPR1, zoom100%, fontes carregadas, produção Next16.3.6. Matriz:375×812 e767/768/769/1023/1024/1025/1440/1919/1920/1921×900. 330 comparações de geometria/tokens aprovadas, tolerância máxima1CSSpx; cores e tokens textuais exatos. Painel, logo, hamburger, texto dos links e CTA medidos. Altura do painel exclui explicitamente cards promocionais removidos.

| Gate      | Resultado | Procedimento e evidência                                                                                                                                                          |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G0.1–G0.4 | PASS      | DOM desktop/mobile, oito itens, baseline, integração autorizada: inventory.md, integration.md, source-navigation.json, source-topology.json                                       |
| G1.1–G1.4 | PASS      | CSS/JS fonte, medidas e adaptações: map.md, control-details.json, source-controls.json, visual-matrix.json                                                                        |
| G2.1–G2.4 | PASS      | spec.md e navigation.config.ts: source separado de examples, match/âncoras, três URLs sem colisão                                                                                 |
| G3.1–G3.4 | PASS      | scope.json, configuração com map, header único; lint/tipos/build e produção                                                                                                       |
| G4.1–G4.5 | PASS      | hybrid.json:10 grupos, incluindo negativos e duas desmontagens reais de hook/Lenis; interactions.json:teclado, resize, histórico e SPA; states.json:limiar±1 e relógio controlado |
| G5.1–G5.4 | PASS      | production.json:quatro URLs200, três fixtures; documento preservado entre rotas internas; baseline raiz intacta                                                                   |
| G6.1–G6.4 | PASS      | matriz sem falhas, scripts reproduzíveis, revisão de escopo e checks de qualidade                                                                                                 |

AC-01→scope.json; AC-02→visual-matrix.json/states.json; AC-03→source-navigation.json/navigation.config.ts; AC-04→interactions.json/hybrid.json; AC-05→hybrid.json; AC-06→interactions.json/hybrid.json; AC-07→production.json; AC-08→qualidade e production.json. Todos aprovados dentro das condições registradas.

## Qualidade

`npm run lint`, `npm run typecheck` e `npm run build`: código0. Check global de formatação encontrou inicialmente o documento preexistente `.prompts/design-template-site-navigation.md`; somente formatação normalizada. Formatação final verificada após atualizar estes artefatos. Nenhum pacote instalado na aplicação.

## Limites e adaptações

- Cinco links abrem destinos originais no Thirdway; suas páginas não foram migradas. Três rotas são exemplos mínimos, não conteúdo de produto.
- CTA mailto substitui formulário de contato original. Cards promocionais removidos; painel fica mais baixo.
- Não há âncoras no menu da fonte. Capacidade híbrida testada com NavLink/hook reais numa fixture isolada e adaptador de fronteira do router. Roteamento de produção e histórico são testados separadamente com Next real.
- Scroll de âncora é imediato para manter foco/seleção previsíveis; reduced motion elimina deslocamentos animados. Relógio conserva cápsulas/horário sem animação de dígitos.
- Não há sidebar, submenu, header compacto ou mudança de altura na fonte observada; esses ramos condicionais são N/A, sem implementação inventada.
- Comparação automatizada e inspeção visual limitadas ao Chrome e larguras registradas; não se afirma equivalência universal em todos os browsers.
