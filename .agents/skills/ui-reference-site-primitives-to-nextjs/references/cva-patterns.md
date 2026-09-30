# Padrões CVA e cn()

Ler ao definir variantes na fase 4. Usar [component-templates.md](component-templates.md) para as props nativas e refs.

## Helper agnóstico

Reutilizar o helper existente. Se ausente, criar `src/shared/utils/cn.ts`:

```ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

`clsx` concatena classes condicionais; não resolve conflitos de utilitários Tailwind. Não prometer que a última classe vence na cascata, nem instalar um resolvedor adicional sem necessidade identificada.

## Variantes tipadas

```ts
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./button.module.css";

export const buttonVariants = cva(styles.base, {
  variants: {
    intent: { primary: styles.primary },
  },
  defaultVariants: { intent: "primary" },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

`primary` é um exemplo de contrato: só gerar essa variante se comprovada na URL. `cn(buttonVariants({ intent }), className)` combina a variante e classes do consumidor sem descartar nenhuma. Com Tailwind, usar strings completas e estáticas que consumam tokens; não construir nomes de classes por interpolação.

Hover/focus são estados CSS, não variantes obrigatórias de props. Usar `compoundVariants` somente para combinações reais observadas; não gerar uma matriz de tamanhos ou intents por conveniência. CSS Modules também deve consumir `var(--ui-*)`, inclusive em bordas, dimensões e transições extraídas.

Referência: [CVA — Variants](https://cva.style/getting-started/variants/).

## Expansão futura

Reservado: receitas para combinações comprovadas de variantes e integração opcional com um helper de merge já adotado no projeto.
