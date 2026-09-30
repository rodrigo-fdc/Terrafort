# Fase 3 — Shell estático

## Entrada

G2 aprovado.

## Atividades

1. Implementar componentes aplicáveis na pasta canônica e somente estilos/auxiliares usados. Preservar elementos semânticos e ordem vertical; não gerar UI genérica fora do shell.
2. Reproduzir padding interno das seções e max-width/gutters dos containers exatamente. Preservar regras fluidas; reservar offset de header fixed uma única vez. Sticky usa seu fluxo original.
3. Manter interiores vazios, salvo o slot children. Footer não recebe colunas de links ou copyright fictício. Logo preserva proporção e estados previstos, sem link inventado. Ícones usados somente em controles estruturais.
4. Fixar tema detectado dentro do shell, incluindo color-scheme quando necessário; remover dependência funcional de toggles e regras automáticas de tema copiadas. Não mudar o tema global do restante da aplicação.
5. SectionWrapper repassa classes e atributos necessários do catálogo, com tipos adequados. Preparar hosts/ref locais para fase 4; atributos sozinhos ainda não constituem animação funcional.
6. Construir fixture de preview conforme G0 quando necessária à medição, sem ativar `(public)/page.tsx` se houver colisão. A fixture usa o shell real e apenas a div de teste; integração final pertence à fase 5.

## Verification Gate G3

- G3.1: revisão do diff confirma arquivos permitidos, componentes locais, interiores vazios e nenhuma raiz existente alterada (hash igual ao baseline).
- G3.2: typecheck e lint aplicáveis passam; a renderização da fixture tem um main, Header/Footer na ordem e sem IDs duplicados.
- G3.3: medidas estáticas em toda a matriz correspondem ao mapa e tolerâncias; não há overflow horizontal nem duplicação de compensação fixed.
- G3.4: emulação light/dark não altera o tema fixado; assets de logo/ícones carregam sem 404. Ausência de navegador/medidas → BLOCKED, não PASS por inspeção de CSS.
