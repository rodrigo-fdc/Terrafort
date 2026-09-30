"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Button } from "./button.component";
import { IconButton } from "./icon-button.component";
import { Typography } from "./typography.component";
import { modalVariants } from "./composites.variants";
import styles from "./composites.module.css";
export const ModalRoot = Dialog.Root;
export const ModalTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Button>
>(function ModalTrigger(props, ref) {
  return (
    <Dialog.Trigger asChild>
      <Button {...props} ref={ref} />
    </Dialog.Trigger>
  );
});
export const ModalClose = Dialog.Close;
export const ModalTitle = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(function ModalTitle({ className, ...props }, ref) {
  return (
    <Dialog.Title asChild>
      <span
        {...props}
        ref={ref}
        className={cn(styles.cModalTitle, className)}
      />
    </Dialog.Title>
  );
});
export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof Dialog.Description>
>(function ModalDescription({ className, ...props }, ref) {
  return (
    <Dialog.Description
      {...props}
      ref={ref}
      className={cn(styles.cModalDescription, className)}
    />
  );
});
export type ModalContentProps = Omit<
  ComponentPropsWithoutRef<typeof Dialog.Content>,
  "title"
> & { title: string; closeLabel: string; description?: string };
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent(
    { title, closeLabel, description, children, className, ...props },
    ref,
  ) {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className={styles.cModalOverlay}>
          <Dialog.Content
            {...(!description ? { "aria-describedby": undefined } : {})}
            {...props}
            ref={ref}
            data-lenis-prevent="true"
            className={cn(modalVariants(), className)}
          >
            <div className={styles.cModalHeader}>
              <ModalTitle>{title}</ModalTitle>
              <Dialog.Close asChild>
                <IconButton
                  aria-label={closeLabel}
                  className={styles.cModalClose}
                >
                  <svg fill="none" viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="m11 21.5 5.25-5.25M21.5 11l-5.25 5.25m0 0 5.25 5.25L11 11"
                    />
                  </svg>
                </IconButton>
              </Dialog.Close>
            </div>
            {description && (
              <Dialog.Description asChild>
                <p className={styles.cModalDescription}>{description}</p>
              </Dialog.Description>
            )}
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    );
  },
);
export const ModalBody = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function ModalBody({ className, ...props }, ref) {
  return (
    <div {...props} ref={ref} className={cn(styles.cModalBody, className)} />
  );
});
export function ModalHeading({ children }: { children: string }) {
  return (
    <Typography as="h2" variant="heading" className={styles.cModalHeading}>
      {children}
    </Typography>
  );
}
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
  Body: ModalBody,
  Heading: ModalHeading,
});
