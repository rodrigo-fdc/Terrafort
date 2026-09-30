# Validação e verificação do Footer

VALIDATE confirma integração e checks técnicos. VERIFY confirma equivalência estrutural/perceptual e critérios de aceite. A primeira etapa não substitui a segunda.

## Antes de executar checks

Leia package.json, lockfile, engines, AGENTS.md e configuração de testes. Use scripts e package manager reais. Com npm, os comandos podem ser:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Com pnpm ou outro gerenciador configurado, use o equivalente disponível. Não troque gerenciador/lockfile ou instale dependências para satisfazer uma lista de exemplo. Se um script não existir e não houver check equivalente definido pelo projeto, registre N/A com justificativa. Quando comportamento relevante exigir teste, a ausência de test runner não dispensa verificação: use o harness/ferramenta disponível ou validação de navegador e registre a evidência.

Registre `Check | Comando | Resultado | Evidência/diagnóstico`. FAIL, BLOCKED e NOT RUN não são PASS. Testes triviais de presença de divs ou snapshots que espelham a implementação não comprovam comportamento. Priorize destinos e conteúdo, estados cliente, acessibilidade e regressões relevantes.

Corrija falhas introduzidas. Falhas preexistentes continuam sendo findings com impacto declarado. Não altere arquivos fora do escopo, suprima errors ou diminua critérios para declarar sucesso.

## Matriz de comparação

Defina antes da implementação:

| Bloco | Fonte/seletor | Viewport/breakpoint | Estado/scroll | Critério e tolerância | Evidência destino | Resultado |
| --- | --- | --- | --- | --- | --- | --- |

Cubra desktop, tablet e mobile, incluindo as transições de breakpoint relevantes. Verifique:

- Hierarquia, ownership, ordem DOM/visual, número de blocos e conteúdo autorizado.
- Containers, colunas, stacking, alinhamento, padding, gaps, separadores, sobreposições e cropping.
- Tipografia e quebras, paleta/tokens, contraste, decoração, overlays e gradients do footer.
- CTA e links internos/externos/legais/socials/contato; destinos reais, foco, toque e teclado.
- Interações, estados, gatilhos, direção, duração aproximada, easing e sequência de animações.
- Reduced motion, fallback sem JS, cleanup e ausência de conteúdo permanentemente invisível.
- Uma única integração global do Footer e ausência de regressões nos consumidores de componentes compartilhados alterados.

Compare HTML renderizado e estilos/estados com a captura. Screenshots são complementares e opcionais. Não exija igualdade de JSX/CSS; uma mudança semântica acessível pode preservar a intenção melhor que o código legado. Registre diferenças deliberadas e sua autorização. Não mascare diferenças reais de layout, conteúdo ou assets para aprovar a matriz.

## Critérios de aceite mínimos

### AC-01 — Structure

Given a página que utiliza o footer,
When o footer é renderizado,
Then sua hierarquia estrutural deve corresponder à referência.

Evidência: mapa raiz/wrappers/blocos → DOM renderizado, incluindo conteúdo adjacente pertencente à composição. Sem cópia direta de HTML inteiro ou duplicação global.

### AC-02 — Reusable implementation

Given a implementação Next.js,
Then elementos reutilizáveis devem usar componentes existentes ou componentes compartilhados adequados.

Evidência: imports/contratos verificados, justificativa dos novos componentes e ausência de abstrações sem responsabilidade clara.

### AC-03 — Responsive

Given desktop, tablet e mobile,
When o viewport muda,
Then o footer deve preservar a estratégia responsiva observada na referência.

Evidência: matriz de colunas, stacking, ordem, ocultações, alinhamento, gaps, tipografia e links legais nos breakpoints relevantes. Conteúdo não pode desaparecer acidentalmente.

### AC-04 — Interaction

Given um elemento interativo,
When o usuário interage,
Then seu comportamento deve preservar a intenção da referência.

Evidência: CTA, links e estados comprovados via teclado/mouse/toque conforme aplicável; animação documentada separadamente. Ausência de uma interação além de links não autoriza inventar accordion ou modal.

### AC-05 — Branding independence

Given o footer migrado,
Then identidade da marca de referência não deve estar acoplada à arquitetura do componente.

Evidência: estrutura reutilizável, dados/configuração centralizados, valores visuais em tokens e assets referenciais identificados. Troca de nome/logo/contato/paleta não requer reescrever a árvore do footer.

### AC-06 — Accessibility

Given navegação por teclado e reduced motion,
Then o footer deve permanecer utilizável e acessível.

Evidência: landmarks, labels, ordem de foco, focus visível, contraste, alternativas de mídia, ausência de ações exclusivas de hover e teste de progressive enhancement para conteúdo estrutural.

### AC-07 — Validation

Given a implementação concluída,
When os checks do projeto forem executados,
Then todos devem passar.

Evidência: comandos/resultados aplicáveis de formato, lint, tipagem, testes e build. N/A requer justificativa; falha conhecida em check obrigatório impede AC-07 PASS.

## Status e relatório final

Escolha um único status:

- **FOOTER MIGRATION COMPLETED**: VALIDATE e VERIFY aprovados, AC-01–AC-07 demonstrados, sem requisito pendente que comprometa o contrato. Branding posterior planejado pode continuar listado quando não fizer parte da migração atual.
- **FOOTER MIGRATION READY FOR VERIFY**: implementação e VALIDATE aprovados; comparação/ACs ainda precisam de evidência, sem falha conhecida escondida. Próximo passo: VERIFY. Não marque os ACs não verificados como PASS.
- **FOOTER MIGRATION INCOMPLETE**: falha conhecida, evidência necessária ausente, destino funcional bloqueado ou requisito do contrato não implementado. Liste os findings e a condição concreta para retomar.

Modelo de saída, substituindo os campos pelos resultados reais:

```text
FOOTER MIGRATION COMPLETED / READY FOR VERIFY / INCOMPLETE

Reference:
- origem, captura local e cobertura

Implemented:
- estrutura
- componentes
- responsive
- interactions
- animations
- accessibility

Reused components:
- nomes e caminhos

New components:
- nomes, caminhos e responsabilidades, ou nenhum

Reference-specific content intentionally not preserved:
- itens e motivo autorizado, ou nenhum

Validation:
- format:check: PASS | FAIL | N/A | NOT RUN
- lint: PASS | FAIL | N/A | NOT RUN
- typecheck: PASS | FAIL | N/A | NOT RUN
- tests: PASS | FAIL | N/A | NOT RUN
- build: PASS | FAIL | N/A | NOT RUN

Acceptance criteria:
- AC-01: PASS | FAIL | NOT VERIFIED
- AC-02: PASS | FAIL | NOT VERIFIED
- AC-03: PASS | FAIL | NOT VERIFIED
- AC-04: PASS | FAIL | NOT VERIFIED
- AC-05: PASS | FAIL | NOT VERIFIED
- AC-06: PASS | FAIL | NOT VERIFIED
- AC-07: PASS | FAIL | NOT VERIFIED

Findings:
- requisito/arquivo, evidência, impacto e condição para resolver, ou nenhum

Pending branding substitutions:
- assets, conteúdo e tokens explicitamente referenciais, ou nenhuma

Next step:
- VERIFY, resolver findings, ou migração concluída
```

Inclua os comandos e evidências necessários para sustentar o resultado sem despejar logs inteiros. Para COMPLETED, VERIFY já ocorreu; não anuncie uma verificação futura como se ela estivesse aprovada. O formato do usuário deve ser preservado em substância, com statuses verdadeiros.
