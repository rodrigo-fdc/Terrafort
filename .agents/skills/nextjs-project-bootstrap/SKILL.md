# Skill: Next.js Project Bootstrap com Spec Driven Development

## Objetivo

Criar um projeto Next.js do zero seguindo práticas modernas de engenharia de software e **Spec Driven Development (SDD)**.

A skill deve transformar uma especificação em uma aplicação Next.js inicial funcional, organizada, validada, segura e pronta para evolução orientada por specs.

---

# Quando usar

Use esta skill quando a tarefa envolver:

* criar um novo projeto Next.js;
* inicializar uma aplicação frontend ou full-stack;
* iniciar um projeto a partir de uma especificação;
* criar a estrutura base de uma aplicação Next.js;
* preparar um projeto Next.js para desenvolvimento orientado por especificação.

Não use esta skill para:

* implementar apenas uma feature em projeto existente;
* corrigir bugs isolados;
* realizar refatorações específicas;
* migrar aplicações existentes para Next.js.

---

# Princípio fundamental

Toda implementação deve seguir:

> **Spec → Plan → Tasks → Implement → Validate → Verify**

Nenhuma implementação relevante deve começar sem que objetivo, escopo e critérios mínimos de aceite estejam definidos.

Não adicionar funcionalidades não solicitadas.

Não antecipar infraestrutura, arquitetura ou dependências sem necessidade atual.

A skill deve definir **invariantes de engenharia**.

A spec deve definir **decisões de produto, domínio e infraestrutura**.

---

# 1. Analisar o contexto

Antes de criar ou modificar arquivos:

1. verificar o diretório atual;
2. identificar se já existe projeto;
3. procurar instruções locais;
4. identificar sistema de specs existente;
5. identificar package manager;
6. identificar ferramentas já adotadas.

Procurar especialmente:

```text
AGENTS.md
README.md
package.json
pnpm-lock.yaml
yarn.lock
package-lock.json
bun.lock
openspec/
.specify/
specs/
.github/
.gitlab-ci.yml
```

Respeitar sempre as instruções específicas do repositório.

Se houver conflito entre esta skill e instruções locais, prevalecem as instruções do projeto.

Nunca sobrescrever inadvertidamente um projeto ou arquivo existente.

---

# 2. Levantar requisitos

Extrair da solicitação e das specs existentes, quando disponíveis:

* nome do projeto;
* objetivo;
* contexto;
* tipo de aplicação;
* funcionalidades iniciais;
* usuários ou atores envolvidos;
* principais fluxos;
* package manager;
* estratégia de estilização;
* integrações externas;
* persistência;
* autenticação;
* testes;
* requisitos de segurança;
* requisitos de acessibilidade;
* requisitos de SEO;
* ambiente de deploy;
* requisitos de CI/CD.

Não inventar requisitos ausentes.

Se uma informação não for necessária para iniciar corretamente o projeto, utilizar o padrão definido nesta skill.

---

# 3. Defaults tecnológicos

Quando a especificação não definir outra escolha, utilizar:

* Next.js;
* App Router;
* React;
* TypeScript;
* TypeScript strict;
* ESLint;
* Tailwind CSS;
* Prettier;
* estrutura `src/`;
* alias `@/*`;
* Server Components por padrão;
* Node.js LTS;
* `npm` como package manager.

Preservar o gerenciador já adotado pelo projeto ou definido pela especificação. Os comandos desta skill usam npm; adaptar os comandos e o lockfile quando outro gerenciador for escolhido.

Utilizar versões estáveis e compatíveis entre si.

Não fixar versões antigas sem justificativa.

Não instalar bibliotecas adicionais apenas porque são populares no ecossistema.

---

# 4. Criar ou validar a especificação inicial

Antes da implementação, garantir que exista definição mínima contendo:

## Contexto

Por que o projeto existe.

## Objetivo

Qual resultado a aplicação deve entregar.

## Escopo

O que será implementado nesta etapa.

## Fora do escopo

O que explicitamente não será implementado agora.

## Requisitos funcionais

Comportamentos observáveis da aplicação.

## Requisitos não funcionais

Quando aplicável:

* performance;
* acessibilidade;
* segurança;
* responsividade;
* compatibilidade;
* SEO;
* manutenibilidade;
* observabilidade.

## Critérios de aceite

Cada requisito relevante deve possuir condição objetiva de validação.

Exemplo:

```md
### AC-01 — Página inicial

Given que o usuário acessa `/`
When a página termina de carregar
Then a página inicial deve ser exibida sem erros
And o layout deve se adaptar a dispositivos móveis e desktop
```

Se o projeto já utilizar OpenSpec, Spec Kit ou outro sistema de especificação, seguir o padrão existente.

Nunca criar um segundo sistema paralelo de specs sem necessidade.

---

# 5. Elaborar o plano técnico

Transformar a especificação em um plano curto e executável.

O plano deve identificar apenas decisões tecnicamente relevantes, incluindo quando necessário:

* rotas;
* layouts;
* principais componentes;
* fronteiras Server/Client;
* data fetching;
* mutações;
* persistência;
* integrações;
* validação;
* tratamento de erro;
* autenticação;
* testes;
* CI;
* critérios de verificação.

Evitar documentação arquitetural excessiva.

Não projetar abstrações para cenários hipotéticos.

---

# 6. Criar tarefas

Decompor o plano em tarefas pequenas, verificáveis e ligadas diretamente à spec.

Exemplo:

```md
- [ ] Inicializar projeto Next.js
- [ ] Configurar TypeScript e lint
- [ ] Configurar Prettier
- [ ] Criar estrutura base
- [ ] Configurar metadata
- [ ] Criar layout global
- [ ] Implementar página inicial
- [ ] Implementar estados de loading/erro quando necessários
- [ ] Criar validações necessárias
- [ ] Criar testes necessários
- [ ] Executar format check
- [ ] Executar lint
- [ ] Executar typecheck
- [ ] Executar testes
- [ ] Executar build
- [ ] Verificar critérios de aceite
```

Cada tarefa deve possuir relação clara com requisito, decisão técnica ou critério de qualidade.

---

# 7. Inicializar o projeto

Quando o diretório ainda não contiver um projeto Next.js, utilizar a ferramenta oficial.

Preferencialmente:

```bash
npx create-next-app@latest . \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

Quando o projeto precisar ser criado em subdiretório:

```bash
npx create-next-app@latest <project-name> \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

Evitar prompts interativos quando as decisões já estiverem definidas.

Se o diretório não estiver vazio, analisar seu conteúdo antes de executar qualquer bootstrap.

---

# 8. Estrutura inicial

Não criar diretórios antecipadamente sem necessidade.

Estrutura recomendada:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   └── shared/
│
├── lib/
├── hooks/
├── services/
├── types/
└── config/
```

Criar somente diretórios utilizados pelo projeto atual.

Arquitetura deve crescer de forma incremental.

---

# 9. App Router

Utilizar App Router em projetos novos.

Não utilizar `pages/` sem requisito explícito ou necessidade de compatibilidade.

Preferir primitivas nativas do framework antes de abstrações próprias.

---

# 10. Server Components por padrão

Componentes devem permanecer Server Components por padrão.

Adicionar:

```tsx
"use client";
```

somente quando houver necessidade real, como:

* `useState`;
* `useEffect`;
* `useReducer`;
* contextos client-side;
* event handlers;
* APIs exclusivas do navegador;
* bibliotecas incompatíveis com Server Components;
* Error Boundaries que exijam Client Component.

Não transformar árvores inteiras em Client Components por conveniência.

Manter a fronteira client-side tão próxima quanto possível do componente que realmente precisa dela.

---

# 11. Data Fetching

Preferir obtenção de dados no servidor.

Em Server Components:

* acessar serviços internos diretamente quando seguro;
* acessar banco diretamente quando a arquitetura permitir;
* consumir APIs externas no servidor quando possível;
* manter secrets e credenciais fora do bundle do cliente.

Evitar criar um Route Handler apenas para que um Server Component da mesma aplicação faça uma chamada HTTP de volta para ele.

Exemplo preferencial:

```text
Server Component
      ↓
service / repository
      ↓
database / API externa
```

Evitar:

```text
Server Component
      ↓
HTTP
      ↓
/api interno
      ↓
database
```

salvo quando existir justificativa arquitetural.

---

# 12. Client-side fetching

Buscar dados no cliente apenas quando houver necessidade real, por exemplo:

* interação altamente dinâmica;
* atualização periódica;
* realtime;
* estado local dependente do navegador;
* infinite scroll;
* experiência otimista;
* APIs disponíveis apenas no browser.

Não introduzir bibliotecas de data fetching client-side automaticamente.

Se SWR, TanStack Query ou solução equivalente for necessária, ela deve estar vinculada à spec ou a uma necessidade técnica concreta.

---

# 13. Mutações

Para mutações originadas pela própria aplicação Next.js, considerar **Server Actions** como primeira opção quando forem adequadas ao fluxo.

Exemplos:

* formulários internos;
* criação de registros;
* atualizações;
* exclusões;
* ações autenticadas da própria aplicação.

Toda Server Action deve tratar entradas como não confiáveis.

Validar novamente no servidor:

* autorização;
* autenticação;
* permissões;
* payload;
* regras de negócio.

Nunca considerar uma Server Action segura apenas por executar no servidor.

---

# 14. Route Handlers

Utilizar Route Handlers em `app/api/` quando houver necessidade de uma interface HTTP explícita.

Casos comuns:

* API pública;
* webhooks;
* callbacks OAuth;
* integrações externas;
* endpoints consumidos por outros clientes;
* mobile apps;
* serviços externos;
* protocolos baseados em HTTP;
* necessidades incompatíveis com Server Actions.

Não criar APIs internas preventivamente.

---

# 15. Estados nativos do App Router

Para fluxos relevantes, avaliar explicitamente estados de:

* carregamento;
* erro;
* recurso inexistente.

Utilizar quando apropriado:

```text
loading.tsx
error.tsx
not-found.tsx
```

Não criar esses arquivos apenas por convenção.

## loading.tsx

Usar quando a rota possuir carregamento assíncrono perceptível e um fallback melhorar a experiência.

## error.tsx

Usar para falhas recuperáveis no segmento da rota.

`error.tsx` pode utilizar `"use client"` quando exigido pelo mecanismo de Error Boundary.

## not-found.tsx

Utilizar quando a aplicação possuir estado semanticamente equivalente a recurso inexistente.

Quando apropriado, utilizar:

```ts
notFound();
```

---

# 16. Suspense

Utilizar `Suspense` quando permitir streaming ou carregamento independente de partes da interface.

Não envolver componentes em `Suspense` sem necessidade.

Priorizar boundaries localizados em torno de trechos realmente assíncronos.

---

# 17. Metadata e SEO básico

Todo projeto deve possuir metadata global mínima.

Utilizar a API nativa do Next.js.

Exemplo:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nome do Projeto",
  description: "Descrição do projeto",
};
```

Não deixar metadata genérica do template inicial.

Metadata específica de páginas deve ser adicionada quando fizer sentido.

Utilizar `generateMetadata()` quando metadata depender de dados dinâmicos.

Não adicionar automaticamente:

* Open Graph avançado;
* Twitter Cards;
* JSON-LD;
* sitemap dinâmico;
* robots customizado;

salvo requisito de SEO ou necessidade concreta.

---

# 18. Componentização

Criar componentes quando houver:

* reutilização;
* responsabilidade clara;
* complexidade relevante;
* benefício real de isolamento;
* necessidade de teste isolado.

Evitar:

* componentes com responsabilidade irrelevante;
* arquivos criados apenas para reduzir linhas;
* abstrações prematuras;
* wrappers sem benefício claro.

---

# 19. Design System

Não instalar biblioteca de componentes por padrão.

A existência de:

```text
components/ui/
```

não implica adoção de shadcn/ui ou qualquer outro design system.

Se a spec exigir:

* design system;
* biblioteca de componentes;
* acessibilidade avançada;
* shadcn/ui;
* Radix;
* React Aria;
* Material UI;
* outro framework;

utilizar a solução definida pelo projeto.

Quando shadcn/ui for explicitamente escolhido, inicializar utilizando sua CLI oficial e preservar suas convenções.

---

# 20. TypeScript

Utilizar TypeScript em modo estrito.

Evitar:

```ts
any
```

Preferir tipos explícitos ou:

```ts
unknown
```

quando os dados ainda precisarem ser validados.

Evitar:

```ts
@ts-ignore
```

Não utilizar assertions apenas para silenciar problemas.

Exemplo a evitar:

```ts
const data = response as User;
```

quando `response` vier de fonte externa sem validação.

---

# 21. Validação nas fronteiras

Toda entrada externa deve ser considerada não confiável.

Validar dados na fronteira em que entram no sistema.

Isso inclui:

* parâmetros de rota;
* query strings;
* formulários;
* Server Actions;
* Route Handlers;
* cookies;
* headers;
* respostas de APIs externas;
* webhooks;
* variáveis de ambiente críticas.

Fluxo preferencial:

```text
external input
      ↓
validation
      ↓
application/domain
```

Não instalar biblioteca de schema automaticamente.

Utilizar Zod, Valibot ou equivalente quando:

* a complexidade justificar;
* houver múltiplos schemas;
* forem necessárias mensagens de erro estruturadas;
* houver integração com forms ou APIs;
* a spec exigir.

---

# 22. Variáveis de ambiente

Nunca inserir secrets diretamente no código.

Utilizar:

```text
.env.local
```

para valores locais não versionados.

Criar:

```text
.env.example
```

quando o projeto depender de variáveis de ambiente.

Exemplo:

```env
DATABASE_URL=
NEXT_PUBLIC_API_URL=
```

Nunca incluir credenciais reais no `.env.example`.

---

# 23. Server-only e variáveis públicas

Variáveis sem prefixo:

```text
NEXT_PUBLIC_
```

devem permanecer exclusivamente no servidor.

Nunca utilizar `NEXT_PUBLIC_*` para:

* tokens privados;
* senhas;
* secrets;
* chaves administrativas;
* credenciais de banco;
* private API keys.

Quando um módulo possuir lógica ou credenciais exclusivamente server-side, considerar:

```ts
import "server-only";
```

para impedir importação acidental pelo cliente.

---

# 24. Segurança

Aplicar por padrão:

* princípio do menor privilégio;
* validação de entradas;
* proteção de secrets;
* autorização server-side;
* autenticação server-side;
* separação Server/Client;
* tratamento seguro de erros;
* ausência de credenciais hardcoded.

Não confiar em controles client-side para autorização.

Exemplo incorreto:

```text
botão escondido no frontend = autorização
```

A autorização real deve ocorrer no servidor.

---

# 25. Tratamento de erros

Não engolir erros silenciosamente.

Evitar:

```ts
try {
  // ...
} catch {
  return null;
}
```

quando a falha for relevante.

Diferenciar quando possível:

* erro esperado de negócio;
* validação;
* recurso inexistente;
* erro de integração;
* erro inesperado.

Não expor stack traces, secrets ou detalhes internos ao usuário.

---

# 26. Dependências

Antes de adicionar qualquer dependência:

1. verificar se React, Next.js ou Node já resolvem o problema;
2. avaliar a necessidade atual;
3. evitar dependências redundantes;
4. utilizar pacote mantido e compatível;
5. instalar somente o necessário ao escopo.

Não adicionar preventivamente:

* ORM;
* autenticação;
* state manager;
* query library;
* component library;
* analytics;
* observabilidade;
* testing framework;
* form library.

Cada dependência adicional deve possuir uma razão concreta.

---

# 27. Formatação

Configurar Prettier como padrão de formatação do projeto.

Adicionar configuração mínima quando necessário.

Scripts recomendados:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

Garantir compatibilidade entre ESLint e Prettier.

Não duplicar regras de formatação desnecessariamente no ESLint.

---

# 28. Git hooks

Não instalar automaticamente:

* Husky;
* lint-staged;
* Lefthook;
* ferramentas equivalentes.

Configurar hooks somente quando:

* a spec exigir;
* `AGENTS.md` exigir;
* o projeto já adotar a ferramenta;
* houver política explícita de pre-commit.

Quando já existir solução equivalente, reutilizá-la.

---

# 29. Scripts mínimos de qualidade

O projeto deve possuir scripts equivalentes a:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

Preservar scripts existentes quando forem equivalentes.

Não duplicar comandos sem necessidade.

---

# 30. Testes

A estratégia de testes deve ser proporcional ao risco e ao escopo.

Priorizar:

1. regras de negócio;
2. lógica de domínio;
3. comportamento crítico;
4. integrações relevantes;
5. fluxos principais;
6. regressões importantes.

Não criar testes triviais apenas para aumentar cobertura.

Ferramentas possíveis:

* Vitest;
* React Testing Library;
* Playwright.

Não instalar todas por padrão.

Escolher somente as necessárias.

---

# 31. Testes unitários

Utilizar testes unitários quando houver:

* funções puras;
* regras de negócio;
* transformações;
* cálculos;
* validadores;
* casos com múltiplas ramificações.

Evitar testar detalhes internos irrelevantes.

---

# 32. Testes de componentes

Criar quando houver comportamento de UI relevante que justifique execução isolada.

Priorizar comportamento observável pelo usuário.

Evitar testar implementação interna.

---

# 33. Testes end-to-end

Utilizar Playwright ou equivalente quando a spec exigir garantia de fluxo completo.

Priorizar fluxos críticos, por exemplo:

```text
login
→ operação principal
→ confirmação
```

Não criar suíte E2E extensa durante um bootstrap simples.

---

# 34. CI

Se o projeto for destinado a repositório colaborativo ou deploy contínuo, deve possuir estratégia mínima de CI.

Se o repositório utilizar GitHub e ainda não possuir pipeline, considerar:

```text
.github/workflows/ci.yml
```

O pipeline mínimo deve executar:

```text
install
→ format:check
→ lint
→ typecheck
→ tests
→ build
```

Executar testes somente quando existirem.

Se o projeto utilizar outra plataforma:

* GitLab CI;
* Bitbucket Pipelines;
* Azure DevOps;
* CircleCI;
* outra;

preservar a solução existente.

Não introduzir GitHub Actions em projeto que já utiliza outra plataforma.

Não criar CI automaticamente para spikes ou protótipos puramente locais, salvo requisito explícito.

---

# 35. Instalação reproduzível

Em CI, utilizar instalação baseada no lockfile.

Para npm, versionar `package-lock.json` e executar:

```bash
npm ci
```

Manter apenas o lockfile do gerenciador adotado, sem misturar gerenciadores no mesmo projeto.

Não regenerar lockfile desnecessariamente.

---

# 36. Git

Se o diretório ainda não for repositório Git e o contexto indicar que o projeto deve ser versionado:

```bash
git init
```

Garantir `.gitignore` adequado.

Nunca executar:

```bash
git push
```

sem solicitação explícita.

Não modificar configurações globais do Git.

Não criar commits automaticamente salvo instrução explícita ou regra específica do workflow.

---

# 37. README

Criar ou atualizar `README.md`.

Manter somente informações úteis.

Estrutura mínima:

```md
# Nome do Projeto

Descrição curta.

## Requisitos

- Node.js
- npm

## Instalação

npm install

## Desenvolvimento

npm run dev

## Validação

npm run format:check
npm run lint
npm run typecheck
npm run build
```

Quando houver testes:

```md
npm test
```

Adicionar variáveis de ambiente, arquitetura ou deploy apenas quando necessário.

---

# 38. Validação obrigatória

Antes de considerar a implementação concluída, executar:

```bash
npm run format:check
```

Depois:

```bash
npm run lint
```

Depois:

```bash
npm run typecheck
```

Quando houver testes:

```bash
npm test
```

ou comando equivalente.

Finalmente:

```bash
npm run build
```

O projeto não pode ser considerado concluído se alguma validação obrigatória falhar.

---

# 39. Corrigir antes de concluir

Se alguma validação falhar:

1. identificar causa raiz;
2. corrigir;
3. executar novamente a validação afetada;
4. executar novamente o conjunto final de checks;
5. somente então declarar conclusão.

Não mascarar falhas.

Não remover regras apenas para fazer os checks passarem.

Não alterar configuração do TypeScript, ESLint ou testes para esconder defeitos sem justificativa técnica.

---

# 40. Verificação contra a spec

Após a implementação:

1. reler a spec;
2. revisar todos os requisitos;
3. revisar todos os critérios de aceite;
4. revisar as tarefas;
5. mapear requisito → implementação;
6. confirmar validações;
7. identificar requisitos não atendidos.

Não considerar concluído um requisito apenas porque existe código relacionado.

A validação deve demonstrar o comportamento solicitado.

---

# 41. Escopo

Durante a implementação:

Não modificar código que não esteja relacionado ao projeto ou ao requisito atual.

Não aproveitar a tarefa para:

* refatorar áreas irrelevantes;
* trocar biblioteca;
* mudar arquitetura;
* atualizar dependências;
* alterar padrões do projeto.

Mudanças incidentais devem ser mínimas e justificadas.

---

# 42. O que não fazer

Não:

* criar funcionalidades fora da spec;
* adicionar banco sem requisito;
* adicionar autenticação preventivamente;
* instalar design system automaticamente;
* instalar shadcn/ui automaticamente;
* instalar state manager automaticamente;
* criar APIs internas desnecessárias;
* criar abstrações prematuras;
* criar diretórios vazios;
* utilizar `"use client"` por conveniência;
* utilizar `any` indiscriminadamente;
* ignorar erros TypeScript;
* ignorar lint;
* ignorar testes;
* ignorar falha de build;
* esconder falhas por configuração;
* expor secrets;
* confiar em autorização client-side;
* sobrescrever arquivos sem análise;
* executar push automaticamente.

---

# 43. Critério de conclusão

A tarefa está concluída somente quando:

* projeto Next.js criado corretamente;
* estrutura coerente com a spec;
* requisitos implementados;
* metadata mínima configurada;
* fronteiras Server/Client corretas;
* entradas externas tratadas adequadamente;
* secrets protegidos;
* formatação válida;
* lint válido;
* TypeScript válido;
* testes relevantes aprovados;
* build aprovado;
* critérios de aceite verificados;
* documentação mínima existente.

---

# 44. Saída esperada

Ao finalizar com sucesso:

```text
IMPLEMENTATION COMPLETED / READY FOR VERIFY

Projeto:
<nome>

Implementado:
- ...
- ...
- ...

Decisões técnicas relevantes:
- ...
- ...

Validação:
- format:check: PASS
- lint: PASS
- typecheck: PASS
- tests: PASS | N/A
- build: PASS

Critérios de aceite:
- AC-01: PASS
- AC-02: PASS

Arquivos principais:
- ...
- ...

Pendências:
- nenhuma

Próximo passo SDD:
VERIFY
```

Caso haja falhas:

```text
IMPLEMENTATION INCOMPLETE

Concluído:
- ...

Falhou:
- ...

Validações:
- format:check: PASS | FAIL
- lint: PASS | FAIL
- typecheck: PASS | FAIL
- tests: PASS | FAIL | N/A
- build: PASS | FAIL

Motivo:
- ...

Pendências:
- ...
```

Nunca declarar:

```text
READY FOR VERIFY
```

quando existir validação obrigatória falhando.

---

# 45. Regra final

Ao tomar uma decisão não explicitamente coberta pela spec, utilizar a seguinte ordem de prioridade:

```text
1. instruções do projeto
2. spec
3. APIs e padrões nativos do Next.js
4. simplicidade
5. menor número de dependências
6. menor superfície client-side
7. menor complexidade arquitetural
```

Quando duas soluções atenderem igualmente ao requisito, preferir a mais simples, mais nativa e mais fácil de validar.