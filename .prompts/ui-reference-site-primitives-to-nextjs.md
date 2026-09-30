Crie uma nova skill no projeto chamada `ui-reference-site-primitives-to-nextjs`. O objetivo desta skill é extrair componentes primitivos e tokens de design de uma URL de referência e recriá-los em React/Next.js de forma agnóstica ao framework de CSS (usando CSS Variables).

Execute as seguintes ações rigorosamente nesta ordem:

1. Crie o diretório base da skill e suas subpastas:

- `ui-reference-site-primitives-to-nextjs/`
- `ui-reference-site-primitives-to-nextjs/references/`
- `ui-reference-site-primitives-to-nextjs/scripts/`

2. Crie o arquivo principal `ui-reference-site-primitives-to-nextjs/SKILL.md` exatamente com o conteúdo a seguir:

```markdown
---
name: ui-reference-site-primitives-to-nextjs
description: Extrai componentes primitivos (botões, inputs, tipografia, badges) e tokens de design de uma URL de referência online. Recria esses elementos como componentes React/Next.js (App Router) reutilizáveis em `src/shared/components/ui/`. A skill é agnóstica de CSS, extraindo valores visuais para `ui-tokens.css` (CSS Variables) e integrando com a stack do projeto alvo (Tailwind, CSS Modules ou Vanilla). Não gera layouts, menus ou seções de página.
when_to_use: O usuário fornece uma URL (site de referência) e solicita a extração/criação do design system básico, primitivos visuais, botões, tipografia ou UI kit para a aplicação.
---

# ui-reference-site-primitives-to-nextjs

## Goal

Extrair a identidade visual (tipografia, cores, espaçamentos) e os componentes primitivos de uma URL de referência, materializando-os em componentes React reutilizáveis (`src/shared/components/ui/`). O Design System base deve ser extraído como CSS Variables (`ui-tokens.css`) e acoplado à stack de estilização existente no projeto.

## Inputs

1. **URL de referência** do site alvo.
2. **Caminho da aplicação Next.js** destino (CWD).

## Procedure

### Fase 0: Reconhecimento e Setup

1. Navegue e analise a URL fornecida extraindo a topologia visual e os estilos computados. Invoque `scripts/extract-url-styles.mjs` se necessário.
2. Identifique a stack de estilização do projeto (Tailwind CSS, CSS Modules ou CSS Puro).
3. Verifique se `class-variance-authority` (CVA), `clsx` e `lucide-react` estão instalados. Instale-os via gerenciador de pacotes padrão caso ausentes.
4. Garanta que o helper `cn()` exista em `src/shared/utils/cn.ts`. Crie-o se não existir.

### Fase 1: Inventário (Extração Semântica)

1. Varra a página para identificar as famílias tipográficas (font-family) de títulos e corpo.
2. Catalogue as variantes de botões (ex: primário, secundário, outline, ghost).
3. Catalogue inputs, textareas e checkboxes (se formulários estiverem presentes).
4. Catalogue badges, chips ou divisores consistentes.

> **Gate 1:** Não avance sem estruturar uma tabela mapeando `Primitivo | Variantes | Estados (Hover/Focus)`. Não invente componentes ausentes na URL.

### Fase 2: Extração e Mapeamento de Tokens (Design System)

1. Leia as orientações em `references/design-tokens-mapping.md`.
2. Crie o arquivo `src/shared/components/ui/ui-tokens.css`.
3. Popule o arquivo com variáveis `--ui-*` contendo os valores exatos extraídos da URL (cores, border-radius, tipografia).
4. Integre o `ui-tokens.css` à stack do projeto (atualizando `tailwind.config.ts` ou importando globalmente no `globals.css`).

> **Gate 2:** Verifique se as variáveis CSS estão acessíveis globalmente na aplicação e se nenhuma configuração pré-existente foi deletada.

### Fase 3: Plano de Execução

1. Reporte ao usuário:
   - Lista exata dos primitivos que serão gerados em `src/shared/components/ui/`.
   - Stack de estilização detectada e como as variáveis `--ui-*` foram integradas.
   - Fontes e dependências adicionadas.

> **Gate 3:** Pause a execução. Solicite a aprovação explícita do usuário antes de iniciar a geração de código.

### Fase 4: Geração de Código

1. Siga os contratos em `references/component-templates.md`.
2. Para componentes interativos, utilize `forwardRef`.
3. Use `cva` para definir as variantes extraídas.
4. O JSX gerado deve consumir as variáveis via Tailwind (`bg-[var(--ui-primary)]` ou configurado no theme) ou diretamente no arquivo CSS associado, sem hardcode de hexadecimais no código fonte.
5. Gere `src/shared/components/ui/index.ts` com exports nomeados.

> **Gate 4:** O código gerado deve conter apenas primitivos. Seções, layouts ou headers são violações do escopo.

### Fase 5: Verificação

1. Execute o build do projeto (ex: `npm run build`).
2. Se houver falhas de tipagem (TypeScript) ou lint, corrija os componentes gerados iterativamente.
3. Entregue o relatório final de primitivos criados.

## Acceptance Criteria

- Build TypeScript passa sem erros.
- Arquivo `ui-tokens.css` existe e centraliza as cores e medidas estruturais.
- Integração da stack concluída com sucesso (Tailwind ou CSS Modules consome as variáveis).
- Componentes usam `forwardRef` e `cva` corretamente.
- Sem código de negócio, navegação ou seções de página (apenas UI base).
```

3. Crie o arquivo `ui-reference-site-primitives-to-nextjs/references/design-tokens-mapping.md` exatamente com o conteúdo a seguir:

````markdown
# Mapeamento de Design Tokens Agnóstico

O objetivo desta etapa é isolar as decisões de design da URL de referência em uma camada pura de CSS (CSS Variables), garantindo que a skill funcione em qualquer projeto Next.js, independentemente do framework visual.

## 1. A Fonte da Verdade (`ui-tokens.css`)

Todo valor de cor, fonte, borda ou sombra extraído deve ser mapeado em `src/shared/components/ui/ui-tokens.css`.

**Padrão de nomenclatura obrigatório (Prefixo `--ui-`):**

```css
:root {
  /* Tipografia */
  --ui-font-sans: "Inter", system-ui, sans-serif;
  --ui-font-heading: "Space Grotesk", sans-serif;

  /* Paleta Base */
  --ui-background: #ffffff;
  --ui-foreground: #0f172a;

  /* Interações */
  --ui-primary: #3b82f6;
  --ui-primary-hover: #2563eb;
  --ui-primary-foreground: #ffffff;

  --ui-border: #e2e8f0;
  --ui-ring: #93c5fd;

  /* Radii */
  --ui-radius-sm: 0.25rem;
  --ui-radius-md: 0.375rem;
  --ui-radius-lg: 0.5rem;
}
```
````

## 2. Integração com a Stack Detectada

### Cenário A: Projeto utiliza Tailwind CSS (v3 ou v4)

Não utilize classes utilitárias arbitrárias (`bg-[#3b82f6]`). Acople as variáveis criadas no passo anterior à configuração do Tailwind.

**Ação:** Edite `tailwind.config.ts` (ou `tailwind.config.js`) inserindo os tokens no `theme.extend`:

```typescript
theme: {
  extend: {
    colors: {
      ui: {
        background: 'var(--ui-background)',
        foreground: 'var(--ui-foreground)',
        primary: {
          DEFAULT: 'var(--ui-primary)',
          hover: 'var(--ui-primary-hover)',
          foreground: 'var(--ui-primary-foreground)',
        },
        border: 'var(--ui-border)',
        ring: 'var(--ui-ring)',
      }
    },
    borderRadius: {
      uiSm: 'var(--ui-radius-sm)',
      uiMd: 'var(--ui-radius-md)',
      uiLg: 'var(--ui-radius-lg)',
    },
    fontFamily: {
      uiSans: ['var(--ui-font-sans)'],
      uiHeading: ['var(--ui-font-heading)'],
    }
  }
}

```

**Importação:** Garanta que `import './ui-tokens.css'` seja injetado em `src/app/globals.css`.

### Cenário B: Projeto utiliza CSS Modules ou Vanilla CSS

**Ação:** Garanta que `ui-tokens.css` seja importado no layout raiz (`src/app/layout.tsx` ou `globals.css`).
Os componentes (ex: `button.component.tsx`) devem associar classes através do CVA que se comunicam com um `button.module.css` local, onde as variáveis `--ui-*` são consumidas nativamente:

```css
/* button.module.css */
.btnPrimary {
  background-color: var(--ui-primary);
  color: var(--ui-primary-foreground);
  border-radius: var(--ui-radius-md);
}
.btnPrimary:hover {
  background-color: var(--ui-primary-hover);
}
```

```

4. Crie os arquivos estruturais de apoio com documentação base e placeholders para expansão futura:
   - `ui-reference-site-primitives-to-nextjs/references/url-inspection-checklist.md` (Checklist para extração de variáveis computadas e famílias tipográficas do DOM).
   - `ui-reference-site-primitives-to-nextjs/references/cva-patterns.md` (Padrões de concatenação `cva` + `cn()`).
   - `ui-reference-site-primitives-to-nextjs/references/component-templates.md` (Contratos TypeScript exigindo `forwardRef` em elementos nativos interativos).
   - `ui-reference-site-primitives-to-nextjs/scripts/extract-url-styles.mjs` (Script Node para extrair estilos da URL alvo).

```
