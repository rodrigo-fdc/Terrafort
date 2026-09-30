# Spec — navegação Thirdway

## Contrato

Fonte única serializável contém os oito itens originais e variante explícita de exemplos. Configuração source aponta ao domínio original; examples troca apenas Approach/Services/People por rotas locais. Demais links continuam externos. Header fixo com painel compartilhado; nenhum aside. Logo reutilizado com Link para raiz. Todos os novos componentes/hooks/CSS/config ficam em navigation/. Exceção autorizada: import no SiteShell. Sem mudanças na raiz ou conteúdo.

Hook único possui open, pathname, activeId e ciclo de scroll. Match exact padrão; segment respeita separador e raiz exata; mais específico vence. Âncoras só concorrem na rota dona com alvo existente. Linha de ativação é borda inferior da linha44 + top16/20. Antes do primeiro alvo nenhuma; fim do documento última; ordem DOM resolve posições iguais. Âncora vence rota; externos nunca ativos. Hash inicial válido posiciona/alinha e foca alvo, scroll manual assume depois; não altera histórico. Clique primário same-page faz pushState apenas quando hash muda, desbloqueia antes de scroll imediato (adaptação funcional sem animação de âncora na fonte). Cross-route usa Next Link e observa montagem com MutationObserver cancelável; alvo ausente é ignorado. Back/Forward preservam histórico. Modificadores não fecham ou navegam aba atual. Resize fecha painel ao cruzar1024; Escape/backdrop retornam foco ao toggle; navegação foca destino. Um controlador Lenis, destruído no cleanup, sem duplicar o antigo header desmontado.

## Aceite e checks

- AC-01 escopo: comparar baseline SHA256; somente import autorizado fora da pasta e três páginas.
- AC-02 geometria: matriz375/1440 e limites768/1024/1920 ±1, cores exatas, overflow<=1px, header único.
- AC-03 dados: oito labels/hrefs rastreáveis, map único, fonte vs exemplos explícitos.
- AC-04 rotas: URLs200, navegaçãoSPA, match exact/segment/falso prefixo/raiz, histórico/reload.
- AC-05 híbrido: testes isolados mesmos resolver/observer para hash válido/inválido, owner, topo/fim, precedência e offset.
- AC-06 modal: Tab/ShiftTab, Escape, backdrop, resize, inert/overflow restaurados e dois ciclos.
- AC-07 fixtures: apenas /approach,/services,/people no grupo examples, texto identificador simples.
- AC-08 qualidade: prettier/lint/typecheck/build, Chrome produção sem erros e fonte carregada.

Não declarar fidelidade perfeita nem PASS sem evidência. Status por check em verification.md.
