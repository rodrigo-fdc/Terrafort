---
name: reference-footer-migration
description: Migra o footer de um site de referência capturado localmente para React/Next.js, derivando um contrato estrutural, visual e comportamental antes da implementação. Use para reconstruir footers legados ou preparar sua estrutura para branding posterior; não para criar um footer sem referência, migrar páginas inteiras ou reconstruir headers.
---

# Reference Footer Migration

## Objetivo e contrato de execução

Reconstruir o footer de forma idiomática em Next.js, seguindo Spec Driven Development e preservando sua composição, responsividade, interações e intenção visual. O resultado esperado é **STRUCTURAL + PERCEPTUAL EQUIVALENCE**, não igualdade de código. HTML/CSS/JS capturados são evidências, não código a transplantar.

Entradas:

- Caminho da captura local: HTML, CSS, JavaScript e assets; manifesto e análise `reference-analysis`, quando existirem.
- Caminho do projeto Next.js destino e página/layout que utiliza o footer.
- Change OpenSpec ativa, quando o projeto usar OpenSpec, e decisões de conteúdo/branding já autorizadas.

Saídas: contrato, plano, implementação incremental, resultados técnicos e relatório de verificação. Reutilize os locais de especificação e componentes adotados pelo projeto; não imponha uma árvore nova.

Use para reconstruir footer de referência, migrar footer legado para React ou preparar sua estrutura para uma identidade visual posterior. Não use para footer sem referência, página inteira, header, branding final do cliente ou outras seções sem relação direta.

## Invariantes

- Altere somente Footer, componentes diretamente reutilizados por ele, tokens necessários, conteúdo/configuração relacionados e testes relevantes. Integração mínima no layout é permitida quando necessária para montar/substituir o Footer e prevista no plano. Não modifique outras sections por conveniência.
- Preserve a autorização e as decisões da conversa. A invocação para migrar autoriza o trabalho no escopo solicitado; não crie uma aprovação adicional automática. Mudança de escopo ou ação que realmente demande autorização deve ser apresentada como delta concreto.
- Se houver OpenSpec, identifique a change ativa e use seus specs, design e tasks. Não crie requisitos paralelos, outra change, archive ou mudanças em specs canônicas por iniciativa desta skill. Se houver múltiplas changes sem uma seleção inequívoca, esclareça qual rege a migração antes de implementá-la.
- Leia AGENTS.md e guias relevantes da versão instalada do Next.js antes de escrever código da aplicação. Respeite caminhos, stack CSS, tokens, package manager e componentes reais do projeto.
- Screenshots são opcionais e complementares. Não use screenshot como única fonte para descobrir o footer ou confirmar comportamentos. Não navegue na referência remota se a captura local fornecer a evidência necessária.
- Não execute JavaScript legado como programa de confiança. Leia-o para identificar comportamento; renderizações de inspeção devem ser locais e controladas, sem transações ou integrações externas implícitas.

## Evidência e resolução de conflitos

Para localizar e derivar o contrato, priorize:

1. HTML.
2. CSS.
3. JavaScript.
4. Análise estruturada existente.
5. Screenshot.
6. Inferência explicitamente identificada.

HTML informa estrutura/conteúdo; CSS informa regras e estados; JavaScript esclarece gatilhos e interações. Confirme a cascata e o estado renderizado quando esses materiais parecerem discordar. A presença de uma classe ou biblioteca não comprova que uma animação é executada no footer.

Quando decidir **como reconstruir** diante de conflito entre evidências, convenções e legado, priorize: comportamento observável necessário → estrutura semântica → design intent → convenções do novo projeto → código legado. Essa ordem não autoriza inventar comportamento nem ignorar regras responsivas comprovadas. Registre a resolução e sua origem.

## Workflow obrigatório

`REFERENCE ANALYSIS → CONTRACT → PLAN → IMPLEMENT → VALIDATE → VERIFY`

Cada etapa termina com um gate **PASS** ou **BLOCKED** e evidência. Use **N/A** somente quando uma capacidade estiver comprovadamente ausente ou um check não se aplicar. **UNKNOWN**, screenshot isolado e build bem-sucedido não comprovam fidelidade. Ao retomar, continue do gate pendente, preservando trabalho e decisões anteriores.

### 1. REFERENCE ANALYSIS

1. Localize HTML da página, stylesheets e scripts associados, assets, manifesto do clone e análise prévia. Registre caminhos, origem e cobertura. Confira se arquivos/minificações/URLs do manifesto apontam para recursos efetivamente disponíveis.
2. Leia a implementação Next.js e sua cadeia de layouts. Determine se o footer já está montado, é uma casca vazia ou possui conteúdo a preservar. Não gere um segundo footer para compensar uma integração desconhecida.
3. Identifique o elemento raiz e seus limites reais. Examine wrappers imediatamente anteriores/posteriores: CTA, faixa de mídia ou statement no final da página podem estar fora de `<footer>`. Classifique-os como bloco do footer, conteúdo adjacente necessário à composição ou seção independente; inclua apenas o que tiver relação direta e justificada.
4. Mapeie sections internas, containers, grids, colunas, navegação, contatos, social links, copyright, informações legais, logos, ícones, imagens, CTAs, decoração, textos animados, separadores, overlays e gradients. Diferencie árvore editorial, wrappers técnicos e duplicação mobile/desktop.
5. Inspecione desktop, tablet e mobile, regras de breakpoint, estados hover/focus/aberto e progresso de scroll. Quando possível, renderize a captura local para obter estilos computados. Registre as lacunas de estado/acesso em vez de preenchê-las por suposição.
6. Verifique componentes existentes: Container, Section, Button, Link, Logo, Icon, tipografia e recursos de animação. Confirme contratos, props, refs, estilos e fronteiras Server/Client; não considere um arquivo vazio uma capacidade disponível.

**Gate ANALYSIS:** origem local e limites do footer identificados; inventário com seletores/caminhos e cobertura desktop/tablet/mobile; comportamento necessário sustentado por HTML/CSS/JS. Falta de evidência estrutural bloqueia o bloco afetado. Mídia substituível da marca não bloqueia por si só a reconstrução; registre o tratamento no contrato.

### 2. CONTRACT

Leia [contract-template.md](references/contract-template.md) e derive um contrato técnico curto, antes de implementar.

- Registre árvore semântica e, para cada bloco: propósito, conteúdo, estrutura, layout, comportamento, reutilização, responsive behavior e animation behavior.
- Separe **STRUCTURE / STYLE SYSTEM / CONTENT / BRANDING**. Preserve conteúdo público de referência quando autorizado como demonstração, mas centralize textos, URLs, contatos e marca em dados/configuração existentes ou em `src/content/` quando apropriado.
- Extraia apenas estilos do footer: background/foreground/muted/border, fontes/peso/tamanho/line-height/tracking, spacing/padding/gaps, alinhamento/grid/container/breakpoints, hover/focus/transições. Mapear para tokens existentes exige equivalência semântica, não apenas uma cor coincidente. Proponha o mínimo de tokens ausentes e registre os valores/origens.
- Separe interação de animação. Exemplo: interação = hover/focus no link; animação = underline cresce da esquerda para a direita. Documente gatilho, direção, sequência, easing e duração aproximada observada, além de reduced motion e fallback sem JS.
- Defina destinos reais dos links, assets reaproveitados, substituições de branding e critérios de verificação. Não invente URLs, CTAs, textos ou ações para completar o contrato.

**Gate CONTRACT:** todos os blocos previstos têm origem, contrato, dados e critérios verificáveis; lacunas ou substituições estão explícitas. Nenhuma cópia de estrutura ruim é justificada por similaridade de código. No OpenSpec, o contrato referencia a change vigente em vez de introduzir outra fonte normativa.

### 3. PLAN

1. Apresente o contrato e o delta de arquivos: componentes, conteúdo, estilos/tokens, assets reutilizados, integração mínima e testes. Justifique subcomponentes por responsabilidade clara; não componentize cada div nem crie wrappers sem valor.
2. Defina mapa de consumo dos componentes existentes, Server/Client boundaries e ordem incremental abaixo. A arquitetura de arquivos segue o projeto; nomes como `FooterNavigation` e `FooterSocialLinks` são exemplos, não obrigatórios.
3. Proponha a estratégia de animação nesta ordem: CSS → APIs React/Next simples → biblioteca já instalada → nova dependência somente se indispensável. Não porte jQuery, Webflow runtime, GSAP ou AOS automaticamente.
4. Identifique scripts de validação, package manager e versões requeridas. Use os comandos reais do projeto. Não copie `pnpm` para um projeto npm; npm é o fallback quando não houver preferência estabelecida.
5. Defina a matriz de comparação e a pendência de cada destino/asset desconhecido. Conteúdo referencial substituível não exige CMS, branding final ou configuração complexa.

**Gate PLAN:** solução implementável dentro do escopo e da spec ativa, arquivos e verificações definidos, decisões necessárias resolvidas. Autorizações existentes continuam válidas. Caso haja delta que exija autorização, prepare-o e explique exatamente a necessidade; não suspenda trabalho independente já autorizado.

### 4. IMPLEMENT

Leia [implementation-guide.md](references/implementation-guide.md). Implemente e confira incrementalmente:

1. Estrutura sem animações.
2. Estilos e tokens necessários.
3. Responsividade.
4. Links e assets.
5. Interações.
6. Animações.
7. Acessibilidade.
8. Testes de comportamento, quando relevantes.

Mantenha Footer como Server Component por padrão. Isole a menor ilha cliente necessária para estado, hooks, eventos, browser APIs ou animação que demande runtime. Preserve conteúdo estrutural acessível sem JS, inclusive scroll reveal; não deixe máscaras/transforms/opacity ocultarem conteúdo permanentemente.

Preserve a intenção do comportamento observado, não selectors/globals legados. Qualquer correção semântica ou adaptação de execução deve constar na verificação. Não altere outras sections, instale dependências dispensáveis ou aplique branding final.

**Gate IMPLEMENT:** footer integrado uma vez, dados/branding desacoplados, estrutura e comportamento previstos implementados, diff limitado ao plano. Destinos não resolvidos são pendências explícitas, nunca links falsos; impedem declarar completo o bloco que requer navegação funcional.

### 5. VALIDATE

Leia [verification-protocol.md](references/verification-protocol.md).

Execute scripts definidos pelo projeto para format:check, lint, typecheck, test e build quando aplicáveis. Em um projeto npm com esses scripts, por exemplo: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Não execute scripts inexistentes nem instale test runner apenas para preencher o relatório.

Adicione testes somente quando houver comportamento relevante: destinos/conteúdo, estados cliente, acessibilidade ou regressão. Não crie testes triviais que apenas repetem o markup. Corrija falhas introduzidas e repita os checks afetados. Registre falhas preexistentes com comando, causa e impacto; elas não são PASS. Não altere arquivos alheios para obter um check verde.

**Gate VALIDATE:** comandos aplicáveis passam, integração renderiza sem falhas de hidratação/runtime e testes relevantes estão concluídos. Check obrigatório falho ou não executado mantém a migração incompleta.

### 6. VERIFY

Compare contrato e implementação: hierarquia/composição, alinhamento/spacing/tipografia, desktop/tablet/mobile, estados, animações, CTA e navegação. Confira foco, teclado, contraste, reduced motion, fallback sem JS e conteúdo de todos os blocos. Screenshots, quando disponíveis, ajudam a verificar cropping e percepção; não substituem evidência de DOM/estilos/comportamento.

Use AC-01–AC-07 de [verification-protocol.md](references/verification-protocol.md). Registre evidência e findings para cada critério. Não confunda ausência de comparação com equivalência demonstrada, nem esconda diferenças intencionais de branding.

**Gate VERIFY:** critérios de aceite comprovados, sem findings não resolvidos que afetem o contrato. Se faltar comparação, use READY FOR VERIFY somente após VALIDATE aprovado e identifique os critérios ainda não verificados. Declare COMPLETED apenas após VERIFY aprovado. Falha conhecida ou requisito bloqueado exige INCOMPLETE.

## Entrega

Use o formato de [verification-protocol.md](references/verification-protocol.md). Informe referência, estrutura/componentes/responsivo/interações/animações/acessibilidade, reutilização, conteúdo específico não preservado, resultados dos comandos, ACs, substituições de branding pendentes e próximo passo.

Não copie HTML inteiro para JSX, CSS global indiscriminadamente, runtimes legados, branding espalhado, links falsos ou dívida técnica. Não transforme todo o Footer em Client Component nem declare fidelidade sem evidência.
