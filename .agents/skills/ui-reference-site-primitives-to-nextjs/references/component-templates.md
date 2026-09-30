# Contratos de componentes primitivos

Aplicar após a aprovação do Gate 3. Consultar [cva-patterns.md](cva-patterns.md) e o inventário de [url-inspection-checklist.md](url-inspection-checklist.md). Os exemplos são contratos, não autorização para criar componentes ausentes.

## Localização e fronteira React

Componentes, estilos e `ui-tokens.css` ficam em `src/shared/components/ui/`; helper compartilhado em `src/shared/utils/cn.ts`. Usar exports nomeados no `index.ts`. Consultar a documentação da versão de Next instalada antes de gerar código. Restringir `"use client"` aos componentes que precisam da fronteira de interação/ref; não transformar o layout raiz em Client Component.

## Botão nativo

```tsx
"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "./button.variants";

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, type = "button", ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type={type}
      className={cn(buttonVariants({ intent }), className)}
    />
  ),
);
Button.displayName = "Button";
```

O exemplo pressupõe `button.variants.ts` com a receita observada; não gerar arquivo vazio. Preservar children, disabled, aria-_, data-_, eventos e atributos nativos. Não introduzir router, links de negócio, analytics ou callbacks globais. A ausência de `type` resulta em button; o consumidor ainda pode pedir submit.

## Campos nativos

| Primitivo observado | Elemento/ref                                 | Contrato                                                                                                               |
| ------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Input               | `input` / `HTMLInputElement`                 | `ComponentPropsWithoutRef<"input">`; repassar id, name, type, value/defaultValue e onChange sem estado duplicado       |
| Textarea            | `textarea` / `HTMLTextAreaElement`           | Repassar rows, disabled, required e atributos de descrição/erro                                                        |
| Checkbox            | `input type="checkbox"` / `HTMLInputElement` | `Omit<ComponentPropsWithoutRef<"input">, "type">`; repassar checked/defaultChecked e onChange; manter semântica nativa |

Todos os controles interativos usam `forwardRef` e CVA para variantes comprovadas. Resolver colisões de props nativas com `Omit` pontual, sem `any`. Associar labels por id/htmlFor, preservar foco visível e nomes acessíveis. Não substituir controles por divs clicáveis. Ícones decorativos devem usar aria-hidden; um botão sem texto exige nome acessível.

Tipografia e badges podem ser componentes sem estado com elementos semânticos tipados. Não implementar Hero, Header, Footer, menu, card de produto ou formulário completo. Não inserir conteúdo de marketing nos defaults.

## Verificação

- Ref aponta ao elemento DOM correto e permite focus().
- Eventos e atributos nativos chegam ao DOM sem props de variantes vazando.
- Valores/defaults e checked/defaultChecked preservam os modos controlled/uncontrolled.
- Variantes consomem `--ui-*`; cores e medidas extraídas ficam centralizadas em ui-tokens.css.
- Props, imports, exports, lint e build passam na aplicação real.

## Expansão futura

Reservado: contratos de tipografia polimórfica, composição de ícones e variantes de estados de validação, somente quando houver evidência na referência.
