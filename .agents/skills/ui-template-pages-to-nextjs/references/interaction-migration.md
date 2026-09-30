# Migração de interações

Use apenas para capacidades observadas/spec, no COMPOSE/IMPLEMENT. Animação visual tem contrato separado.

| Elemento/página | Evento | Estado inicial → resultado | Teclado/toque | Integração/dados | Componente existente | Evidência/adaptação |
| --------------- | ------ | -------------------------- | ------------- | ---------------- | -------------------- | ------------------- |

Inspecione HTML/ARIA, CSS de estados e JS associado para menus, disclosure, tabs, galerias/sliders, forms, filtros, lightboxes, navegação ativa e comportamento dependente de scroll, quando presentes. Biblioteca importada não comprova interação usada. Dados inacessíveis/estado desconhecido permanecem lacunas.

Reutilize contratos locais antes de criar um controlador. Isole estado/eventos na menor ilha Client; não adicione estado global para uma interação local. Preserve URL/query/hash quando forem parte do estado, histórico/back quando necessário, foco/labels, Escape/retorno de foco em overlays, validação e comportamento de resize. Não mantenha interação exclusiva por hover sem alternativa acessível.

## Integrações reais versus demonstração

Leia efeitos e destinos antes de ativar ações. Não reproduza POST de referência, transação ou integração externa automaticamente. Ausência de backend não autoriza toast de sucesso, envio simulado, auth fictícia ou APIs novas.

Documente opções proporcionais: integração existente do destino, demonstração explicitamente identificada que preserve os estados aprovados, ou handoff para destino real previsto. Quando a escolha alterar comportamento essencial, obtenha a decisão necessária e não trate silêncio como aprovação. Continue unidades independentes.

Dados demonstrativos são determinísticos, suficientes para estados relevantes e separados da estrutura. Não invente novos filtros/menus para tornar uma página “funcional”.

## Verificação focada

Teste ação → resultado, cancelamento/retorno, navegação/estado persistido, validação/erro e acessibilidade quando aplicáveis. Não submeta serviços da referência para provar UI. Se popup reutilizado conflitar com um overlay, resolva container/camada/foco no contrato existente com delta mínimo autorizado; não contorne um teste com clique forçado.
