---
name: ui-template-site-shell-to-nextjs
description: Extrair o shell estrutural, a responsividade e os wrappers de animação de um template HTML/CSS/JS institucional ou de marketing e recriá-los em Next.js App Router. Usar para Header, Main Flow, Footer e navegação mobile vazia; não para migrar conteúdo ou um design system completo.
---

# UI Template Site Shell → Next.js

## Objetivo e entradas

Converter evidências do template em spec, plano, tarefas, implementação isolada e verificação. Receber o template (arquivos locais ou URL acessível), a aplicação Next.js de destino e, se houver, a página/variante de referência. Se faltar a fonte, pedir sua localização; não inventar medidas ou animações. Esta skill implementa o shell quando invocada para conversão; a mera criação de sua documentação não autoriza converter a aplicação.

## Invariantes de escopo

- Componentes, hooks, contexto, estilos e adaptadores próprios do shell ficam estritamente em `src/shared/template/site/`. Não gerar componentes de UI em outra pasta.
- Componentes canônicos: `site-shell.component.tsx`, `header.component.tsx`, `footer.component.tsx`, `mobile-menu.component.tsx`, `logo.component.tsx` e `section-wrapper.component.tsx`. Criar somente os aplicáveis, justificando ausências pela fonte; shell, header, footer e wrapper seguem a topologia encontrada.
- Mapear Header → Main Flow → Footer, com regiões internas vazias. Não criar componentes para cada div, cards, botões genéricos, conteúdo de marketing ou itens de navegação. O botão nativo do menu pertence ao Header.
- Único conteúdo demonstrativo permitido: `<div>Conteúdo da Landing Page</div>`. Permitir logo/wordmark original e textos acessíveis funcionais como “Abrir menu”, “Fechar menu” e “Navegação”; não são textos de marketing.
- Fixar o tema padrão detectado como único. Não implementar seletor nem alternância por preferência do sistema.
- Reproduzir tokens estruturais comprovados: alturas, offsets, larguras máximas, gutters, padding, margin, breakpoints, empilhamento e cores/fontes necessárias ao shell. Não extrair um design system inteiro.
- Preservar a página raiz existente até confirmação explícita da alteração concreta. Grupos de rota não criam prefixo de URL: `src/app/page.tsx` e `src/app/(public)/page.tsx` colidem em `/`.
- Preservar SSR; limitar Client Components às interações e runtimes de animação. Não executar scripts legados globalmente ou copiar HTML com scripts inline.

## Saída da conversão

```text
src/shared/template/site/
  site-shell.component.tsx
  header.component.tsx
  footer.component.tsx
  mobile-menu.component.tsx
  logo.component.tsx
  section-wrapper.component.tsx
  [estilos, hooks e adaptadores locais comprovadamente necessários]
src/app/(public)/layout.tsx
src/app/(public)/page.tsx
```

Assets estáticos podem ficar em `public/template/site/`; dependências e lockfile podem mudar na raiz. Spec/evidências usam o sistema SDD existente. Arquivos de rota são adaptadores finos, não componentes reutilizáveis fora da pasta canônica. O layout global só muda quando necessário e autorizado, sem afetar outras rotas silenciosamente.

## Pipeline obrigatório

Ler [contrato de evidências e gates](references/verification-contract.md) no início e o passo correspondente antes de cada fase.

| Fase | Instrução                                               | Saída mínima                                         |
| ---- | ------------------------------------------------------- | ---------------------------------------------------- |
| 0    | [Reconhecimento](steps/00-reconhecimento/STEP.md)       | Inventário, baseline e decisão de isolamento         |
| 1    | [Mapeamento](steps/01-mapeamento/STEP.md)               | Topologia, tokens e estados medidos                  |
| 2    | [Spec e plano](steps/02-spec-plano/STEP.md)             | Requisitos, contratos, tarefas e critérios de aceite |
| 3    | [Shell estático](steps/03-shell-estatico/STEP.md)       | Estrutura, tema, logo e wrappers vazios              |
| 4    | [Interações](steps/04-interacoes/STEP.md)               | Menu, scroll e animações funcionais                  |
| 5    | [Rotas e isolamento](steps/05-rotas-isolamento/STEP.md) | Preview verificado e integração autorizada           |
| 6    | [Verificação](steps/06-verificacao/STEP.md)             | Evidências finais e resultado por requisito          |

Não avançar com gate FAIL ou BLOCKED. Corrigir e repetir os checks afetados; alterações de contrato invalidam as fases dependentes. Um preview aprovado não equivale à integração final aprovada. Não pedir confirmação geral da spec por padrão: solicitar somente decisões ausentes e a alteração da raiz quando aplicável.

## Entrega

Informar arquivos criados, rota verificada, tema, biblioteca de ícones, runtime de animação e resultado de cada gate. Usar `READY FOR VERIFY` somente quando todos os gates e critérios obrigatórios passarem. Caso a troca da raiz aguarde confirmação, reportar `PREVIEW VERIFIED / INTEGRATION BLOCKED`, com URL, evidências e diff proposto. Nunca declarar teste não executado como aprovado.
