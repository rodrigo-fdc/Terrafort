---
name: ui-template-pages-to-nextjs
description: Migra páginas existentes de sites ou templates HTML/CSS/JavaScript para Next.js App Router, descobrindo rotas e templates compartilhados e compondo componentes e design system locais. Use para reconstruir páginas de referência de qualquer domínio; não para inventar produto, criar páginas sem referência ou extrair um design system do zero.
---

# UI Template Pages to Next.js

## Contrato

Reconstruir páginas observáveis da referência com **equivalência estrutural, perceptual e comportamental**. Compor antes de criar; preservar intenção, não código legado. Não presumir domínio, páginas, componentes, grupos de rota ou infraestrutura.

Entradas: referência (URL e/ou captura local), projeto destino, páginas/limites autorizados e change/spec vigente, quando houver. Saídas: inventário, mapa de rotas/templates, plano de composição, páginas implementadas e evidências de validação/verificação nos locais adotados pelo projeto.

## Invariantes

- Leia AGENTS.md e instruções locais. Antes de escrever código Next.js, consulte os guias relevantes da versão instalada, incluindo `node_modules/next/dist/docs/` quando disponíveis. Não transplante APIs conhecidas de outra versão.
- Consulte, nesta ordem: instruções locais → OpenSpec/change ativa → análise estruturada → HTML → CSS → JavaScript → manifest/inventário MCP → componentes do destino → screenshots. Para decisões, priorize spec → estrutura observável → CSS/JS → componentes existentes → screenshot → inferência declarada. Análise estruturada deve manter rastreabilidade às fontes; divergência exige conferência, não suposição.
- Use a change ativa sem criar requisitos paralelos. Autorização e plano existentes continuam válidos; apresente decisões novas e esclareça apenas ambiguidades que impeçam o trabalho dependente.
- Modifique somente o necessário às páginas autorizadas. Não refatore áreas alheias, troque bibliotecas, reescreva componentes/design system ou adicione infraestrutura por conveniência. Extensões mínimas comprovadamente necessárias devem constar no plano e respeitar o escopo.
- App Router + TypeScript, Server Components por padrão; interatividade em ilhas cliente. Use Next Link, Image e metadata quando apropriados à versão/projeto. Respeite CSS, tokens, diretórios e package manager existentes.
- Não invente páginas, conteúdo funcional, destinos ou interações. Não copie HTML/CSS inteiro, runtimes legados ou dependências automaticamente. Screenshots não provam comportamento/tokens. Mantenha conteúdo acessível e reduzido movimento nas animações.

## Pipeline e gates

Cada gate registra **PASS** ou **BLOCKED**, evidência e pendências por página/template. N/A exige justificativa. Não avance uma unidade bloqueada; continue unidades independentes autorizadas. Ao retomar, use os artefatos existentes.

### DISCOVER — evidência e páginas

1. Leia [prerequisite-check.md](references/prerequisite-check.md). Localize spec/change, captura, análises, inventários, assets, componentes e tokens. Identifique lacunas de informação por capacidade; nomes de pastas/skills não são pré-requisitos universais.
2. Use [page-discovery-protocol.md](references/page-discovery-protocol.md) para reconciliar páginas, navegação e links internos dentro dos limites da referência. URLs descobertas não são autorização para escopo ilimitado.
3. Registre função observada, sections, relações, responsive, interactions, animations, assets e cobertura de cada página. Diferencie desconhecido de comprovadamente ausente.

**Gate DISCOVER:** páginas intencionais no escopo identificadas com origem; cobertura/lacunas explícitas; evidência suficiente para mapear a unidade seguinte. Não invente rotas para preencher lacunas.

### MAP — templates e rotas

1. Consulte [page-template-detection.md](references/page-template-detection.md) para agrupar estruturas equivalentes, separando templates de datasets.
2. Consulte [route-mapping.md](references/route-mapping.md). Reconcilie URLs com rotas/layouts reais, colisões, parâmetros, âncoras, famílias dinâmicas e destinos não migrados.
3. Produza antes do código:

   | Página | Rota original | Rota Next.js | Template compartilhado | Sections | Componentes | Interações | Fidelidade |
   | ------ | ------------- | ------------ | ---------------------- | -------- | ----------- | ---------- | ---------- |

   Fidelidade registra evidência/cobertura e adaptações necessárias; nunca um PASS antecipado. Acrescente datasets, relações, animações, responsive e assets no contrato de cada linha.

**Gate MAP:** cada página incluída tem destino único, contrato rastreável e classificação template/dataset justificada; colisões materiais resolvidas; destinos pendentes explícitos.

### COMPOSE — plano implementável

1. Leia [component-composition.md](references/component-composition.md). Confira exports, props, estados, estilos/tokens e Server/Client boundaries reais. Classifique primitive, layout, domain/shared, section e componente específico. Não imponha Sidebar, Modal, Dashboard ou qualquer catálogo por domínio.
2. Quando aplicável, leia [responsive-migration.md](references/responsive-migration.md), [interaction-migration.md](references/interaction-migration.md), [animation-migration.md](references/animation-migration.md) e [content-and-branding.md](references/content-and-branding.md).
3. Apresente páginas/templates, rotas, componentes disponíveis/necessários, tokens consumidos, estados, animações, responsive rules, dados/assets, ambiguidades/lacunas e delta de arquivos. Ordene por dependências reais.
4. Com plano SDD/OpenSpec aprovado, execute-o; não peça nova confirmação. Sem plano, registre/apresente este plano e prossiga no escopo já autorizado. Decisão material pendente bloqueia apenas trabalho dependente; tempo decorrido não equivale a aprovação.

**Gate COMPOSE:** contratos/componentes/tokens conferidos; plano executável e compatível com spec/autorização; fronteiras cliente e adaptações explícitas; nenhuma lacuna silenciosa de design ou integração.

### IMPLEMENT — por unidade

1. Migre uma página/template: dados tipados determinísticos → composição estrutural → estilos/tokens existentes → responsive → links/assets/metadata → interações → animações/progressive enhancement.
2. Preserve ordem, hierarquia, ritmo e densidade das sections observadas. Reutilize layout/header/footer na camada já adotada; não duplique shell em cada página.
3. Use dados + rota dinâmica para famílias equivalentes; mantenha diferenças estruturais demonstradas. Não crie CMS/backend nem dados aleatórios para simular funcionamento.
4. Confira a unidade com VALIDATE antes da próxima unidade dependente. Alterações compartilhadas exigem conferir seus consumidores afetados. Não migre um site complexo como um bloco indivisível.

**Gate IMPLEMENT:** unidade renderiza a composição prevista, dados/branding separáveis, destinos resolvidos ou pendentes declarados, escopo respeitado; sem conteúdo permanentemente oculto ou falso sucesso funcional.

### VALIDATE — integração técnica

Siga [validation-protocol.md](references/validation-protocol.md). Execute os checks reais do projeto, testes de comportamento relevantes e integração no navegador quando necessário. Corrija falhas introduzidas e repita checks afetados. Não formate/refatore arquivos alheios para mascarar falhas preexistentes.

**Gate VALIDATE:** checks aplicáveis PASS, sem erro conhecido de integração/hidratação/runtime. FAIL, BLOCKED ou NOT RUN obrigatório impedem conclusão; script ausente pode ser N/A justificado, não PASS fictício.

### VERIFY — equivalência e navegação

Compare cada página/template com suas fontes e matriz de estados/viewports: sections, ordem/hierarquia, conteúdo, componentes, tokens/layout, responsive, interactions, animations, assets e destinos internos. Build não prova fidelidade. Registre adaptações e AC-01–AC-07 pelo protocolo.

**Gate VERIFY:** evidência comprova o contrato de todas as unidades incluídas; sem findings que o comprometam. Branding posterior fora do escopo pode permanecer identificado.

## Entrega

Use o relatório de [validation-protocol.md](references/validation-protocol.md): páginas/templates/rotas, reutilização/criações, responsive/interactions/animations, adaptações, checks, ACs, pendências e próximo passo.

- **PAGE MIGRATION COMPLETED:** VALIDATE e VERIFY aprovados.
- **PAGE MIGRATION READY FOR VERIFY:** implementação e VALIDATE aprovados, sem falha conhecida; comparação ainda pendente.
- **PAGE MIGRATION INCOMPLETE:** requisito/falha/evidência necessária pendente; informe a condição concreta para retomar.

Não crie recursos auxiliares sem uso concreto. Inventários manuais, MCP ou scripts existentes são válidos; nenhum extrator heurístico é fonte normativa ou dependência obrigatória.
