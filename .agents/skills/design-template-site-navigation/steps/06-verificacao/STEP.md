# Fase 6 — Verificação final contra a spec

## Entrada

G5 aprovado. Reler a spec, o mapa e os contratos antes de concluir.

## Atividades

1. Revisar diff e rastreabilidade: requisito → configuração/componente → check. Confirmar que dados são separados, loops não duplicam listas e nenhuma área de conteúdo/design system foi recriada.
2. Executar comandos reais de formatação, lint, tipos, testes aplicáveis e build do projeto. Em npm, usar npm run para scripts. Ausência de script exige método equivalente documentado; falha não pode ser mascarada por desativação de regra.
3. Iniciar servidor de produção, esperar readiness e testar rotas/fixtures e assets. Repetir matriz visual e de estados com fontes carregadas. Medir cores, offsets, tipografia, altura variável e âncoras, não apenas screenshot do topo.
4. Executar matriz híbrida completa do contrato: rota, falso prefixo, hash direto, same-page/cross-route, scrollspy, topo/fim, histórico, modificadores, alvo inexistente, teclado e reduced motion. Ramos não presentes na fonte recebem testes isolados, sem itens novos no menu real.
5. Verificar cleanup em navegação cliente real entre rotas existentes. Reload não prova cleanup de SPA; mudança para 404 pode carregar novo documento. Registrar identidade do documento e efeitos observáveis para distinguir os casos, sem introduzir hooks de teste no produto.
6. Conferir ausência de erros de console/hydration e recursos faltantes; atualizar tarefas/gates com resultados observados. Corrigir falhas e repetir somente checks afetados antes do conjunto final. Encerrar servidor temporário de teste.

## Verification Gate G6

- G6.1: G0–G5 e AC-01–AC-08 aprovados, com N/A apenas nos checks condicionais comprovados; nenhum destino/handler obrigatório pendente.
- G6.2: checks de qualidade e build terminam com código zero; rotas da configuração demonstrada e fixtures são verificadas em produção.
- G6.3: matriz visual/funcional e casos negativos passam, com evidências e revisão dos arquivos; nenhuma “fidelidade perfeita” alegada sem medição.
- G6.4: diff respeita escopo, root/layouts preservados conforme plano, documentação de exemplos/configuração suficiente para reproduzir o resultado.

## Relatório

Entregar `IMPLEMENTATION COMPLETED / READY FOR VERIFY`, caminhos, URLs demonstradas, topologia, estados/limiares, regras de ativo e resultados G0–G6/AC-01–AC-08. Listar adaptações comprovadas e destinos não pertencentes ao escopo sem apresentá-los como migrados. Se existir falha/bloqueio obrigatório, usar `IMPLEMENTATION INCOMPLETE` com check, causa e próximo passo; nunca converter ausência de evidência em PASS.
