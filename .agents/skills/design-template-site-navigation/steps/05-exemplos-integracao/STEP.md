# Fase 5 — Rotas/seções de exemplo e integração

## Entrada

G4 aprovado; fonte real de dados e topologia já implementadas.

## Atividades

1. Criar de 1 a 3 páginas ou seções simuladas em `src/app/(public)/(examples)/`. Páginas usam segmentos reais como `navigation-demo/page.tsx`; os nomes dos grupos não aparecem na URL. Não criar `(examples)/page.tsx` sobre uma raiz já existente.
2. Usar markup mínimo inline nas páginas: título identificador e alvos com IDs únicos. Pode haver espaçamento suficiente para testar scroll, claramente restrito à fixture. Não criar componentes Hero/Features/Pricing nem confundir essa geometria de teste com o design extraído.
3. Cobrir ramo da fonte por fixtures e ramo híbrido ausente por teste isolado do componente/provider com dados de teste. Não inventar links visíveis no menu de produção apenas para demonstrar capacidade. Se existem mais destinos internos do que fixtures, usar rotas já existentes; sem correspondência, apresentar o mapa pendente em vez de criar rotas extras ou links quebrados silenciosamente.
4. Configuração de demonstração, quando necessária, mantém labels/ordem visuais e mapeia explicitamente IDs para URLs de exemplo dentro de navigation.config.ts. Header/Drawer recebem a variante, sem condicionais de href espalhadas. Documentar quais destinos são simulados.
5. Montar a navegação pelo layout permitido, reutilizando o shell existente. Layout aninhado não remove header de layout ancestral: resolver a composição antes de renderizar. Não ocultar header antigo via CSS, duplicar IDs, ou editar componente externo sem escopo para isso. Se bloqueado, descrever o slot/alteração mínima necessária e solicitar ampliação específica.
6. Preservar as rotas atuais e a raiz. Esta skill não exige substituir a homepage para provar navegação. Aplicar somente a integração autorizada; não publicar exemplos/deploy automaticamente.
7. Testar URL direta, reload, navegação cliente, hash e histórico nas fixtures; garantir que a variante não vaze para páginas reais. Registrar como acessar e como remover os exemplos sem quebrar configuração de produção.

## Verification Gate G5

- G5.1: 1–3 fixtures no diretório prescrito, com URLs reais e HTTP 200, sem colisões ou conteúdo de produto recriado.
- G5.2: comportamento é demonstrado com mesma implementação de NavLink/estado usada na navegação; mocks não substituem testes de integração.
- G5.3: um único header visível/ativo por página; layouts/rotas existentes preservados; qualquer ampliação de escopo está registrada.
- G5.4: todos os hrefs internos da variante testada e seus fragmentos resolvem; destinos reais não cobertos não são declarados funcionais sem evidência.
