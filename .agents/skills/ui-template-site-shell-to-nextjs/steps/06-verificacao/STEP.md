# Fase 6 — Verificação final contra a spec

## Entrada

G5 aprovado; integração pendente não pode ser marcada como concluída.

## Atividades

1. Revisar diff e mapear AC-01 a AC-08 para arquivos e evidências. Verificar que não existem componentes próprios fora da pasta canônica, links/conteúdo adicionados, dependências sem uso ou modificações incidentais.
2. Executar scripts reais do projeto: format:check, lint, typecheck, testes relevantes e build. Em npm, usar `npm run` para scripts e `npm test` somente quando existir. Não instalar formatter/test runner apenas para simular check ausente; definir verificação equivalente objetiva e documentada antes da implementação. Gate BLOCKED se não houver como verificar requisito obrigatório.
3. Rodar servidor de produção e testar `/`: HTTP 200, placeholder único, shell, assets, console e hydration. Repetir interações e matriz de medidas na rota final, não apenas na fixture.
4. Guardar screenshots da fonte/destino e tabela de valores observados, nos mesmos viewports/estados. Comparar geometria estrutural excluindo conteúdo removido; não afirmar fidelidade por semelhança visual subjetiva.
5. Registrar resultados e limitações; atualizar tarefas somente com evidência. Encerrar servidor temporário iniciado pela execução.

## Verification Gate G6

- G6.1: todos os gates anteriores PASS; AC-01 a AC-08 PASS ou checks condicionais N/A comprovados. Nenhum item obrigatório pendente.
- G6.2: comandos de qualidade e build terminaram com código zero; falhas pré-existentes relevantes são reportadas e não convertidas em PASS.
- G6.3: rota final passa smoke test e testes de comportamento/medidas, sem console error, hydration mismatch, overflow indevido ou asset ausente.
- G6.4: diff final respeita autorização e escopo; matriz requisito → evidência completa e reproduzível.

## Relatório de entrega

Informar `READY FOR VERIFY`, caminhos, URL final, tema único, ícones, engine/adaptação, G0–G6 e AC-01–AC-08 com evidências. Se falhar, usar `IMPLEMENTATION INCOMPLETE` e identificar check, observado, esperado e correção pendente. Se faltar confirmação da raiz, usar o estado específico da fase 5. Não usar “concluído” para um preview que ainda não atende o roteamento final.
