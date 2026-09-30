---
name: ui-reference-site-homepage-to-nextjs
description: Compõe uma homepage Next.js App Router a partir de uma URL de referência, usando navegação, primitivos, compostos e tokens existentes. Use para descobrir e implementar seções e seu empilhamento vertical; não para gerar componentes base ou navegação.
---

# ui-reference-site-homepage-to-nextjs

## Contrato

Entradas: URL da homepage de referência e CWD da aplicação Next.js com App Router em `src/`.

Saídas permitidas:

- `src/app/(public)/page.tsx`: Server Component que empilha as seções.
- `src/shared/components/sections/`: seções, tipos, estilos locais e ilhas `*.client.tsx` necessárias.
- `src/app/(public)/_mock-data.ts`: dados estáticos, determinísticos e tipados.

Não gere ou modifique navegação, shell, footer global, primitivos, compostos isolados, layouts de rota, APIs, dependências ou configuração. Consuma os contratos e tokens `--ui-*`/`--nav-*` existentes. Não altere o arquivo base de tokens.

Hero, Features, Pricing, FAQ e Testimonials são exemplos, não uma lista obrigatória. Gere somente seções comprovadas na referência, incluindo padrões próprios do site. Preserve ordem, conteúdo disponível, responsividade, sobreposições e comportamento de rolagem.

## Gates

Cada fase termina em PASS ou BLOCKED, com evidência verificável. UNKNOWN não permite avançar. Use N/A apenas para elementos comprovadamente ausentes na cobertura inspecionada. Preserve as decisões e autorizações da conversa; retome a fase bloqueada após resolver a causa.

Inventário, delta de arquivos, plano de dados e resultados são apresentados na conversa. Não crie artefatos fora dos caminhos permitidos. Fixtures de verificação podem ser temporárias, sem criar rotas permanentes na aplicação.

### Fase 0 — Pré-requisitos, antes da navegação externa

Leia [prerequisite-check.md](references/prerequisite-check.md).
Confirme navegação em `src/shared/components/navigation/`, primitivos e compostos em `src/shared/components/ui/`, tokens globais, contratos de importação e stack CSS.
Leia AGENTS.md e os guias relevantes em `node_modules/next/dist/docs/` quando disponíveis.
Audite a rota `/`, seu layout efetivo, landmarks existentes e conflitos entre route groups.

**Gate 0:** caminhos, exports, tokens e rota viáveis, sem dependências estruturais ausentes. Se faltar uma peça básica, interrompa imediatamente e indique a etapa anterior necessária. Não crie substitutos nem mova componentes para satisfazer o gate.

### Fase 1 — Inventário semântico da homepage

Leia [homepage-discovery-protocol.md](references/homepage-discovery-protocol.md).
Inspecione desktop/mobile, DOM renderizado, estilos computados e progressão de scroll.
Use [extract-sections-inventory.mjs](scripts/extract-sections-inventory.mjs) como coleta auxiliar, nunca como classificação final.

Produza:

| Ordem | Nome/ID da seção | URL + seletor + viewport/estado | Primitivos/compostos consumidos | Mock necessário? | Fundo, espaçamento e scroll |
| --- | --- | --- | --- | --- | --- |

Registre também a árvore de wrappers, ordem DOM versus ordem visual, âncoras, entradas/saídas de sticky/pin e conteúdo duplicado apenas para responsividade.
Revalide dependências por seção: FAQ exige o Accordion real se a referência o utilizar; sua ausência bloqueia a geração.

**Gate 1:** toda seção tem origem, limites, dependências e estados identificados. Nenhuma seção inventada, conteúdo de navegação duplicado ou interação classificada por aparência apenas.

### Fase 2 — Dados de demonstração, como proposta revisável

Leia [mock-data-patterns.md](references/mock-data-patterns.md).
Prepare o conteúdo completo e tipado de `_mock-data.ts` na conversa, sem gravar a aplicação ainda. A gravação ocorre na Fase 4 após aprovação; isso concilia esta fase com o gate obrigatório anterior à codificação.
Preserve conteúdo público disponível e necessário à fidelidade. Use mocks plausíveis somente para lacunas ou demonstrações solicitadas, identificando as substituições.

**Gate 2:** dados determinísticos, IDs estáveis, origem/substituições registradas, estrutura compatível com as props existentes e sem alegações comerciais inventadas apresentadas como reais.

### Fase 3 — Plano e aprovação explícita

Apresente ordem exata das seções, contratos de props, dados propostos, wrappers, regras de scroll, tokens consumidos, arquivos e estratégia de validação.
Mostre o destino da homepage existente e um resumo concreto do que será substituído. O grupo `(public)` não cria uma URL isolada: sua `page.tsx` atende `/`.
Peça aprovação explícita para este plano antes de codificar. Uma aprovação já concedida ao mesmo plano não precisa ser repetida. Silêncio não autoriza.

Se houver necessidade de editar arquivos fora do contrato, interrompa essa parte e solicite autorização específica para a mudança de escopo, depois de preparar a solução revisável. Não trate o aceite da homepage como autorização para instalar bibliotecas ou reescrever componentes base.

**Gate 3:** aprovação registrada para arquivos, dados e eventual substituição de `/`; conflitos de roteamento resolvidos sem alterações externas implícitas.

### Fase 4 — Implementação por composição

Leia [section-composition-patterns.md](references/section-composition-patterns.md).

1. Grave `_mock-data.ts` com o conteúdo aprovado.
2. Gere cada seção no diretório permitido. Importe primitivos e compostos reais; não reconstrua seus internals.
3. Use Server Components como padrão. Isole estado, browser APIs e eventos em `*.client.tsx`.
4. Consuma tokens existentes. Para medidas exclusivas da seção, siga as regras de escopo local do guia visual.
5. Preserve conteúdo, imagens, links, proporções e wrappers observados. Não transforme todo o site em uma imagem.
6. Monte `page.tsx` apenas com imports, dados e empilhamento das seções. Não replique header/footer já fornecidos pelo layout nem aninhe outro `main` dentro de um existente.
7. Reutilize mecanismos de scroll/animação instalados e disponíveis. Não inicie um segundo smooth-scroll global.

**Gate 4:** diff limitado ao plano; nenhuma geração de UI base, dependência nova ou lógica de negócio; SSR e fronteiras cliente/servidor preservados; todas as seções e dados aprovados integrados à rota correta.

### Fase 5 — Verificação e entrega

Execute [visual-fidelity-guide.md](references/visual-fidelity-guide.md).
Rode typecheck, lint disponível e build com o gerenciador do projeto; use npm como fallback. Abra `/` e confira console, hidratação, links, âncoras, scroll e interações existentes.
Corrija regressões introduzidas e repita os checks afetados. Não reduza tolerâncias nem o escopo aprovado para transformar uma falha em PASS.

**Gate 5:** build e verificações técnicas aprovados; matriz de fidelidade completa para seções, breakpoints e estados acordados. Validação apenas amostral ou falha externa permanece pendente, com diagnóstico explícito.

Entregue: URL local, arquivos, mapa final, dados substituídos, dependências reutilizadas, evidências, comandos/resultados e limitações. Não declare fidelidade pixel-perfect sem comparação suficiente.
