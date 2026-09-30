# Validação, verificação e entrega

VALIDATE comprova integração técnica. VERIFY comprova equivalência de páginas. Build não substitui nenhum contrato visual/comportamental.

## Checks reais

Leia scripts, lockfile, engines e ferramentas disponíveis. Use o package manager do projeto; npm é o fallback quando não houver preferência estabelecida. Não replique pnpm em um projeto npm, troque lockfile ou instale dependências para cumprir um exemplo.

Quando disponíveis, execute equivalentes reais de format:check, lint, typecheck, test e build. Registre `Check | Comando | Resultado | Evidência`. Script ausente sem equivalente pode ser N/A justificado; check obrigatório não executado é NOT RUN, não PASS. Testes relevantes podem usar o harness/navegador existente sem criar infraestrutura nova.

Valide incrementalmente por página/template; conclua checks de integração ao terminar o conjunto. Corrija falhas introduzidas e confira consumidores de shared components alterados. Falhas preexistentes continuam FAIL com impacto; não altere arquivos fora do escopo para declarar tudo verde.

Testes úteis: lookup/slugs, destinos/query/hash, estados reais, ação/validação/erro, teclado/foco e regressões. Não crie testes triviais que reproduzem markup. Não envie formulários/transações externas ao verificar uma referência.

## Matriz de VERIFY

| Página/template | Fonte/estado | Viewport/breakpoint | Critério/tolerância | Evidência destino | Resultado/adaptação |
| --------------- | ------------ | ------------------- | ------------------- | ----------------- | ------------------- |

Por página confira sections presentes/ordem, landmarks/hierarquia, composição/densidade, conteúdo, componentes/tokens, containers/gutters/gaps, tipografia/quebras, sobreposições, responsive, interactions, animations e assets. Cubra variantes da família, desktop/tablet/mobile e transições relevantes.

Cruze DOM, estilos computados e comportamento com as fontes. Screenshots ajudam composição/cropping/hierarquia, mas não provam animação, tokens ou componentização. Registre correções semânticas, reduced motion/fallback e adaptações autorizadas. Não exija igualdade de JSX nem copie dívida técnica.

Verifique todos os links internos relevantes no escopo: acesso direto, transições, refresh, âncoras, query e slugs. Pendências explícitas fora do escopo são admissíveis; destino quebrado ou pendente em funcionalidade obrigatória impede a conclusão da unidade.

## Critérios de aceite

Use os requisitos da change vigente como fonte normativa; associe estes critérios aos seus IDs sem criar outra spec paralela.

| Critério                  | Given / When / Then                                                                                                          | Evidência necessária                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| AC-01 Page discovery      | Given a referência; When a skill analisa suas páginas; Then todas as páginas intencionais no escopo devem ser identificadas. | Reconciliação de fontes, inclusão/exclusão e lacunas do inventário               |
| AC-02 Structural fidelity | Given uma página migrada; Then sections e hierarquia devem preservar a estrutura da referência.                              | Contrato → DOM/composição; adaptações registradas                                |
| AC-03 Component reuse     | Given componentes existentes; Then reutilizá-los quando semanticamente apropriados.                                          | Exports/props conferidos e decisões de composição justificadas                   |
| AC-04 Responsive fidelity | Given diferentes viewports; Then preservar a estratégia responsiva da referência.                                            | Matriz com stacking, ordem, visibilidade, layout e comportamento                 |
| AC-05 Behavioral fidelity | Given uma interação da referência; Then preservar sua intenção.                                                              | Ação/estado/resultados, navegação, animações quando presentes e teclado/fallback |
| AC-06 Architecture        | Given Next.js; Then Server Components são default e client boundaries localizados.                                           | Rotas/templates, imports, dados/props e ownership de estado/layout               |
| AC-07 Validation          | Given implementação concluída; Then os checks do projeto devem passar.                                                       | Resultados reais de checks aplicáveis, sem falhas ocultadas                      |

Ausência comprovada de animação/interação complexa é N/A para essa capacidade, não evidência de uma funcionalidade inventada. Ausência de comparação é NOT VERIFIED, não PASS.

## Status

- **PAGE MIGRATION COMPLETED:** implementação, VALIDATE e VERIFY aprovados para todo o conjunto incluído; ACs comprovados e nenhum finding compromete o contrato. Branding posterior planejado pode estar fora do escopo.
- **PAGE MIGRATION READY FOR VERIFY:** implementação/VALIDATE aprovados e nenhuma falha conhecida; comparação ainda pendente, com critérios não verificados declarados.
- **PAGE MIGRATION INCOMPLETE:** evidência necessária, requisito, destino obrigatório ou check falho/bloqueado. Informe unidade afetada e condição de resolução; conclusão parcial não é conclusão do site.

## Relatório final

Escolha um único status e preencha apenas com resultados demonstrados:

```text
PAGE MIGRATION COMPLETED / READY FOR VERIFY / INCOMPLETE

Pages:
- implementadas, excluídas do escopo e bloqueadas, com origem

Shared page templates:
- famílias, variantes e datasets, ou nenhum

Routes:
- URL original → rota Next.js; destinos pendentes identificados

Reused components:
- exports/caminhos e responsabilidades

New local/shared components:
- caminhos e justificativas, ou nenhum

Responsive:
- regras e viewports conferidos

Interactions:
- ações/estados conferidos; integrações ausentes/adaptadas

Animations:
- intenção/runtime/reduced motion verificados, ou N/A com motivo

Reference adaptations:
- conteúdo, branding, assets, estrutura/semântica ou integração; origem da decisão

Validation:
- format:check: PASS | FAIL | N/A | NOT RUN
- lint: PASS | FAIL | N/A | NOT RUN
- typecheck: PASS | FAIL | N/A | NOT RUN
- tests: PASS | FAIL | N/A | NOT RUN
- build: PASS | FAIL | N/A | NOT RUN

Acceptance criteria:
- AC-01–AC-07: resultado individual e evidência

Pending:
- requisito/página/destino, impacto e condição para resolver; branding futuro separado

Next step:
- VERIFY, resolver findings, ou migração concluída
```

Para COMPLETED, VERIFY já ocorreu; não anuncie uma verificação futura como aprovada. Preserve o formato solicitado com statuses verdadeiros e links aos artefatos, sem despejar logs inteiros.
