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
