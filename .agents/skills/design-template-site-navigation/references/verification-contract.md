# Contrato de verificação e evidências

## Artefatos SDD

Reutilizar o sistema existente (OpenSpec, Spec Kit ou specs). Sem convenção, usar `specs/design-template-site-navigation/` com spec, plano, tarefas, mapa e evidências. Artefatos de uma execução não são gravados na pasta desta skill.

Cada requisito liga **fonte → decisão → arquivo → check → evidência**. Registrar URL/arquivo, data/revisão da fonte, browser, viewport, DPR, zoom, fontes carregadas, URL/hash, scroll e estado do menu. Conservar baseline de arquivos/rotas afetados para distinguir alterações do usuário. Não transportar segredos/storage desnecessários da sessão de navegação.

## Estados dos gates

Cada check registra ID, requisito, procedimento reproduzível, esperado, observado, evidência e revisão dos arquivos.

- PASS: resultado observado atende ao esperado.
- FAIL: execução contradiz o esperado.
- BLOCKED: acesso, recurso, ferramenta, informação ou escopo necessário ausente.
- N/A: somente para caso condicional ausente na fonte, com justificativa verificável.

Gate passa quando todos os checks obrigatórios passam; N/A justificado é aceito para casos condicionais. Screenshot isolada não prova medidas, teclado ou roteamento. Não aumentar tolerância nem retirar check após falha para obter aprovação. Mudanças em contratos invalidam checks dependentes.

## Matriz visual

Comparar fonte/destino no mesmo navegador, DPR, zoom e viewport, após carregamento de fontes e fim de transições. Usar 375×812, 1440×900 e B−1/B/B+1 para cada breakpoint que altere a navegação, deduplicando larguras. Acrescentar 320px quando necessário ao suporte mínimo do projeto.

Medir: altura do header em cada estado, offset/top, z-index, posicionamento do logo, max-width, paddings/gaps, tamanhos/tipografia/bordas dos links, dimensões/posição do toggle e drawer. Preservar declarações CSS, unidades e curvas originais; tolerância máxima de 1 CSS px em medidas computadas por arredondamento. Cores computadas, z-index e breakpoints devem corresponder exatamente. Animações têm duração/easing/estados comparados por parâmetros e clock/seek controlado, não só espera arbitrária.

Estados: topo, limiar de scroll −1/no limiar/+1, scroll descendo/subindo quando relevante, hover/focus/active, drawer fechado/aberto, mudança de orientação/breakpoint, reduced motion, URL direta e retorno histórico. Assertar ausência de overflow horizontal (`scrollWidth <= clientWidth + 1`). Espaço dependente de conteúdo excluído deve estar identificado antes da comparação.

## Critérios de aceite da conversão

| ID    | Condição objetiva                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-01 | Componentes/suporte/config/assets novos ficam na pasta canônica; exceções só as permitidas pelo SKILL.md; sem Hero/Features/Pricing/sidebar inventados.      |
| AC-02 | Topologia e todos os estados visuais atendem à matriz medida; um único header ativo por página; sem compensação duplicada.                                   |
| AC-03 | navigation.config.ts preserva ordem, labels, hrefs, grupos e rastreabilidade; Header/Drawer renderizam via map; nenhuma lista hardcoded no JSX.              |
| AC-04 | Rotas internas usam Link; active state por pathname acerta exact/descendente e não produz falsos prefixos; reload e Back/Forward funcionam.                  |
| AC-05 | Âncoras same-page/cross-route, hash direto e scroll manual funcionam; alvo não fica coberto pelo header; seleção determinística sem hash/histórico espúrios. |
| AC-06 | Menu/toggle respeitam breakpoint/modalidade; teclado, foco, fechamento, scroll lock e cleanup funcionam; closed/desktop não deixam links ocultos focáveis.   |
| AC-07 | 1–3 fixtures em (public)/(examples) têm URLs reais sem colisões; demonstram o comportamento aplicável sem substituir conteúdo preexistente.                  |
| AC-08 | Formatação, lint, tipos, build e testes relevantes passam; páginas respondem 200, sem erros de console/hydration/asset.                                      |

Para fonte sem âncoras ou sem rotas, a apresentação não ganha itens inventados: testar o ramo ausente do contrato em teste isolado de NavLink/provider com dados de teste, sem renderizá-los como navegação real. N/A aplica-se à reprodução desse ramo na fonte, não à capacidade híbrida exigida de NavLink.

## Casos negativos mínimos

- `/sobre-nos` não ativa `/sobre`; `/` não fica ativo em todas as rotas.
- `#contato` de outra página aponta à rota dona; ID ausente/hash inválido não causa exception ou loop.
- Nenhum estado ativo duplo entre link de rota e âncora concorrentes.
- Abrir em nova aba não dispara scroll na aba atual.
- Menu aberto + resize/unmount não deixa body travado, inert ou listener duplicado.
- Header que muda de altura não encobre âncora nem oscila no limiar.
- `(examples)` não fornece prefixo de URL; duas pages resolvendo o mesmo caminho bloqueiam integração.
