# Contrato responsivo

Use no COMPOSE para páginas com variação de layout, e no VERIFY. Responsive inclui comportamento e reorganização, não apenas media queries.

## Matriz por section/template

| Bloco/estado | Regra/breakpoint de origem | Viewport | Grid/container/gaps | Ordem/stacking | Visibilidade/interação | Tipografia/mídia | Evidência |
| ------------ | -------------------------- | -------- | ------------------- | -------------- | ---------------------- | ---------------- | --------- |

Inspecione CSS/media/container queries e DOM efetivo em desktop, tablet e mobile, incluindo limites imediatamente antes/depois dos breakpoints relevantes. Registre valores exatos e comportamentos fluidos. A convenção de breakpoint do destino só substitui a origem quando preservar a estratégia ou quando a spec definir uma adaptação.

Confira densidade, quantidade de colunas, max-width/gutters, padding/margens assimétricos, gaps, ordem DOM versus ordem visual, sobreposições/z-index, sticky/fixed, overflow, crop/focal point, tamanhos/quebras de texto e safe areas quando presentes.

## Variações estruturais

- Grid que vira carousel, lista que vira accordion e troca de mídia são contratos específicos; não invente esses padrões porque o viewport é menor.
- Menu mobile existente é consumido no layout; modifique-o somente se necessário à rota e no escopo. Não gere outro menu da página.
- Prefira uma árvore responsiva quando preservar semântica e layout. Duplicação técnica do legado não é requisito; se duas árvores forem necessárias, impeça foco/IDs duplicados e esconda corretamente a variante inativa.
- Componentes ocultos não podem continuar focáveis; filtros/controles relevantes precisam permanecer alcançáveis conforme a estratégia evidenciada.
- Reordenação visual não deve criar uma experiência incoerente de leitura/teclado. Registre a correção semântica preservando intenção.

Verifique também conteúdo longo/curto e slots opcionais da família. Screenshot de um único tamanho não comprova cobertura. Compare estilos computados, geometria e estados; registre tolerâncias justificadas antes de aprovar, sem usar tolerância para ocultar mudanças de topologia.
