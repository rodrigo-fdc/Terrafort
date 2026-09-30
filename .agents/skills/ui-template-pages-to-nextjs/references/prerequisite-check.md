# Pré-requisitos e integração SDD

Use no DISCOVER, antes de gerar páginas. Valide capacidades/evidências, não nomes obrigatórios de diretórios, bibliotecas ou componentes.

## Inspeção do destino

Leia AGENTS.md aplicáveis, package.json, lockfile/engines, configuração TS/CSS, rotas/layouts, exports dos componentes e tokens. Use `rg --files` e buscas dirigidas; não percorra node_modules indiscriminadamente. Confirme o App Router e as convenções existentes. Se o projeto não usar App Router, não converta a aplicação inteira implicitamente: identifique o requisito/spec necessário para o destino.

Descubra scripts e ferramentas de navegador/testes disponíveis; não instale um runner apenas para preencher um check. Resolva os docs de Next a partir do pacote instalado; ausência de guias locais exige documentação oficial da versão, não APIs presumidas.

## OpenSpec / fonte normativa

1. Identifique configuração, instruções e change ativa com os recursos realmente disponíveis no projeto.
2. Leia proposal/specs/design/tasks pertinentes. Artefato ausente não autoriza criar uma segunda especificação concorrente.
3. Havendo múltiplas changes sem seleção inequívoca, esclareça qual rege a implementação dependente; análise independente pode continuar.
4. Mapeie páginas/contratos/testes às tarefas e requisitos existentes. Atualize tarefas somente após conclusão demonstrada e conforme o workflow adotado.
5. Contradição entre captura e spec deve ser registrada. A spec governa adaptações; não reivindique igualdade visual para uma alteração deliberada.
6. Sem OpenSpec, use a convenção SDD local para inventário, contratos, plano e evidências. Não crie uma infraestrutura SDD nova quando documentos locais bastarem. Não arquive changes nem altere specs canônicas por iniciativa da migração.

## Evidências da referência

Procure análises equivalentes a site-map, pages, sections, components, design-system, responsive, interactions, animations e assets. Podem estar em `reference-analysis/`, spec, captura, manifest ou outro local. Especialistas como `site-map-analyzer`/`pages-analyzer` e demais analyzers são produtores opcionais, não dependências obrigatórias.

Registre:

| Capacidade/página | Fonte/caminho | Cobertura/estado | Lacuna | Ação |
| ----------------- | ------------- | ---------------- | ------ | ---- |

- Mapa/páginas: URLs, limites e relações demonstráveis.
- Sections/componentes: hierarquia, limites e variantes.
- Design/responsive: tokens computados, regras de layout e mudanças estruturais.
- Interaction/animation: estados, gatilhos, ações, sequência e runtime observado.
- Assets: origem, dimensões/focal point quando disponíveis, disponibilidade e caráter substituível.

## Bloqueio proporcional

- Informação suficiente pode ser derivada de HTML/CSS/JS, mesmo sem todos os arquivos de análise.
- Componente ausente pode justificar composição local ou extensão compartilhada mínima no plano; não bloqueie pela falta de um catálogo de domínio.
- Estrutura desconhecida, ação essencial sem contrato ou conflito de escopo bloqueiam a unidade afetada. Continue unidades independentes autorizadas.
- Ausência de mídia original não bloqueia automaticamente: preserve slot, proporção/cropping e fallback determinístico identificado. Não declare a mídia equivalente sem comparação.
- Backend ausente não autoriza fake submit/sucesso. Registre a dependência e opções de adaptação no contrato; uma escolha necessária permanece pendente até resolvida.

Gate: ambiente/spec identificados, fontes disponíveis rastreáveis, lacunas com impacto e condição de resolução. Desconhecido não é ausência comprovada.
