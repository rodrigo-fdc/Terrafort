# Templates compartilhados e datasets

Use no MAP depois de identificar páginas. Quantidade de HTMLs, URLs e templates são medidas diferentes.

## Contrato estrutural comparável

Para cada candidata, derive:

- layout envolvente e ownership de header/footer/navegação;
- landmarks, hierarquia e ordem das sections;
- grids/containers, slot de mídia, conteúdo repetitivo e sobreposições;
- variantes e mudanças de topologia entre viewports;
- estados/interações, contratos de dados e gatilhos de animação.

Normalize apenas diferenças editoriais: texto, identificadores gerados, URLs de mídia e conteúdo de listas. Não elimine wrappers que governam grid, sticky, overflow/masks ou scroll para fabricar igualdade. Não use classname, DOM hash ou screenshot semelhante como prova única.

## Decisão de agrupamento

| Família | Páginas/datasets | Estrutura comum | Diferenças comprovadas | Decisão | Evidência |
| ------- | ---------------- | --------------- | ---------------------- | ------- | --------- |

- Mesmos slots/sections/layout/responsive/behavior, variando conteúdo: template compartilhado + datasets tipados.
- Variações opcionais pequenas e com evidência: slots/variantes explícitos, sem booleanos arbitrários para cada detalhe.
- Diferenças importantes de ordem, hierarquia ou comportamento: templates separados, mesmo com paleta semelhante.
- Evidência incompleta: candidato, sem abstração aprovada por antecipação.

Oito páginas equivalentes podem virar um template e oito entradas de conteúdo; oito arquivos diferentes não justificam oito cópias nem um mega-template cheio de exceções. Conteúdo compartilhado sem layout compartilhado também não justifica uma page factory.

## Representantes e cobertura

Escolha representantes que cubram variantes, densidades de conteúdo e responsive/estados diferentes. Inspecione as diferenças de todos os membros antes de agrupar; validar um representante não prova slugs, conteúdo ou links dos demais.

O contrato da família inclui shape dos dados, campos obrigatórios/opcionais sustentados, conjunto de slugs/identidades e mapa variante → sections. A rota dinâmica é uma consequência dessa análise, não um objetivo por si só. Se URL/spec requer rotas estáticas distintas, mantenha-as e compartilhe composição internamente.
