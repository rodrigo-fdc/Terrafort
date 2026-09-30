# Composição e fronteiras arquiteturais

Use no COMPOSE. O catálogo é o código real do destino, não uma lista idealizada.

## Auditoria de consumo

| Elemento da referência | Categoria | Export/caminho existente | Props/slots/estados | Tokens/layout | Server/Client | Decisão |
| ---------------------- | --------- | ------------------------ | ------------------- | ------------- | ------------- | ------- |

Leia implementações e exports, não apenas nomes. Confirme semântica, variantes, refs/foco, CSS, efeitos colaterais e dependências. Um arquivo vazio ou componente com nome semelhante não prova correspondência. Button, Container, Card ou Section existentes não devem ser clonados localmente quando atendem ao contrato.

Categorias úteis:

- UI primitive: elemento base visual/interativo reutilizável.
- Layout: composição persistente entre páginas.
- Domain/shared: responsabilidade recorrente comprovada na referência.
- Section: faixa/bloco semântico da página com layout e conteúdo próprios.
- Page-specific: responsabilidade restrita a uma página/template.

## Decisão por elemento

1. Reutilize equivalência semântica real, respeitando seu contrato visual/funcional.
2. Componha primitivos/compostos existentes para a section observada.
3. Crie componente local se a responsabilidade for específica.
4. Crie/estenda compartilhado somente com reutilização demonstrada, delta mínimo no plano e autorização do escopo. Confira os consumidores afetados.

Não extraia cada div. Wrappers que controlam container, stacking, sticky, overflow, acessibilidade ou animação têm função; wrappers meramente herdados não precisam existir. Não imponha catálogo administrativo ou de qualquer domínio.

## Página, sections e layouts

A página orquestra sections na ordem observada. Header/Footer/layout persistentes pertencem à camada já usada pelo projeto; não os empilhe novamente dentro de cada página. Uma página simples não exige dezenas de arquivos. Diretórios de sections/componentes seguem as convenções reais, sem árvore obrigatória.

Mantenha `page.tsx` Server quando possível: leitura/lookup de dados e composição no servidor; estado, eventos e browser APIs em ilhas como uma galeria/filtro localizado. Um filho Client não exige transformar seu ancestral Server. Props que cruzam a fronteira devem ser serializáveis; não passe handlers do servidor como funções comuns. Use os contratos suportados pela versão instalada.

## Tokens e CSS

Detecte Tailwind, CSS Modules ou Vanilla e consuma tokens semânticos existentes, inclusive CSS Variables quando adotadas. Verifique cores, fonte/peso, spacing, radius/borders/shadows, container/grid e breakpoints. Não substitua um valor observado por token parecido que altere o layout.

Token ausente: registre propósito, valor/origem e consumidores; proponha a extensão mínima dentro do escopo. Não redesenhe o sistema nem espalhe hardcodes duplicados para esconder a lacuna. Sem correspondência ou autorização para uma mudança estrutural compartilhada, bloqueie a dependência e continue composição independente.
