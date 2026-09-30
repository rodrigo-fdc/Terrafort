# Radix, composição e fronteiras React

Instale apenas pacotes correspondentes a padrões confirmados e aprovados: `@radix-ui/react-dialog`, `@radix-ui/react-accordion`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip` e/ou `sonner`. Reutilize versões compatíveis instaladas. Confira APIs e tipos da versão alvo.

Os snippets são padrões de integração, não templates visuais universais. Ajuste slots e estrutura ao DOM observado; não gere componentes ausentes. Todos os tokens citados precisam ser extraídos antes do uso.

## Modal

Arquivo `modal.component.tsx`, com partes exportadas para composição:

```tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { Button } from "./button.component";
import styles from "./modal.module.css";

const contentClass = cva(styles.content);

type TriggerProps = ComponentPropsWithoutRef<typeof Button>;
export const ModalTrigger = forwardRef<HTMLButtonElement, TriggerProps>(
  function ModalTrigger(props, ref) {
    return <Dialog.Trigger asChild><Button {...props} ref={ref} /></Dialog.Trigger>;
  },
);

export const ModalContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function ModalContent({ className, children, ...props }, ref) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content {...props} ref={ref} className={cn(contentClass(), className)}>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
});

export const ModalRoot = Dialog.Root;
export const ModalTitle = Dialog.Title;
export const ModalDescription = Dialog.Description;
export const ModalClose = Dialog.Close;
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
});
```

```css
.overlay {
  position: fixed;
  inset: 0;
  background: var(--ui-modal-backdrop);
  z-index: var(--ui-modal-overlay-layer);
}
.content {
  position: fixed;
  inset: var(--ui-modal-inset);
  width: var(--ui-modal-width);
  max-width: var(--ui-modal-max-width);
  padding: var(--ui-modal-padding);
  background: var(--ui-modal-bg);
  color: var(--ui-modal-foreground);
  border-radius: var(--ui-modal-radius);
  box-shadow: var(--ui-modal-shadow);
  z-index: var(--ui-modal-content-layer);
}
```

Esse posicionamento só serve se corresponder à referência. Acrescente transform, animações e variantes CVA apenas conforme evidência. Não passe props fictícias ao Button: use suas variantes reais.

Componha Title/Description com Typography local via `asChild` somente se ela encaminhar ref e props corretamente e produzir a tag necessária. Caso contrário, verifique se a estrutura original permite composição por filhos; se não permitir, bloqueie a incompatibilidade. Nunca omita o título acessível. Sem descrição, configure `aria-describedby={undefined}` conforme a API instalada. Para fechamento visível, `ModalClose asChild` envolve Button/IconButton local compatível.

## Accordion

Arquivo cliente, com conteúdo por slots e Trigger composto de Button local:

```tsx
"use client";

import * as Primitive from "@radix-ui/react-accordion";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { Button } from "./button.component";
import styles from "./accordion.module.css";

const triggerClass = cva(styles.trigger);
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Button>
>(function AccordionTrigger({ className, ...props }, ref) {
  return (
    <Primitive.Trigger asChild>
      <Button {...props} ref={ref} className={cn(triggerClass(), className)} />
    </Primitive.Trigger>
  );
});

export const AccordionRoot = Primitive.Root;
export const AccordionItem = Primitive.Item;
export const AccordionHeader = Primitive.Header;
export const AccordionContent = Primitive.Content;
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
```

Header contém Trigger; Content é seu irmão dentro de Item. Use Typography local para texto e forneça classes tokenizadas aos slots exportados. Mapeie `[data-state]`; animações de expansão podem consumir `--radix-accordion-content-height`. Não fixe a altura de conteúdo dinâmico. Repasse refs/props também nos wrappers adicionais que criar.

Os exemplos usam CVA sem variantes fictícias. Quando variantes forem observadas, acrescente somente essas chaves e derive seus tipos com `VariantProps<typeof recipe>`.

## Sonner

Crie um wrapper cliente exportado `Toaster`, configure `toastOptions.unstyled: true` e classes locais tokenizadas. Preserve e mescle opções/classes recebidas em vez de descartá-las. Importe `Toaster`/`toast` do Sonner; não implemente outro sistema de notificações.

Quando a estrutura exigir conteúdo próprio, utilize `toast.custom` com Typography, Button, Badge e ícones locais. Ajuste também o container administrado pelo Sonner; aparência default/richColors não substitui extração. Documente como mensagens e ações chegam por props/callbacks, sem lógica de negócio.

Não monte o Toaster no layout automaticamente: essa alteração está fora da pasta UI. Valide o wrapper em fixture isolada e informe que a aplicação precisa de uma única montagem, se ainda não houver uma.

## API e RSC

Use o mesmo padrão tipado `Object.assign` para `Card.Header`, `Card.Body` e partes realmente observadas. Exporte também cada parte nominalmente. Objetos compostos definidos em módulos cliente são consumidos como objetos no cliente; em Server Components importe as partes nomeadas. Props que cruzam a fronteira devem ser serializáveis. Não adicione `"use client"` ao barrel inteiro.

Fontes oficiais para conferir a versão: [Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Accordion](https://www.radix-ui.com/primitives/docs/components/accordion), [Sonner](https://github.com/emilkowalski/sonner).
