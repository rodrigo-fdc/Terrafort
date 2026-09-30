"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { checkboxVariants } from "./ui.variants";
import styles from "./ui.module.css";
export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> &
  VariantProps<typeof checkboxVariants>;
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ tone, className, ...props }, ref) {
    return (
      <span className={styles.checkboxWrapper}>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          className={cn(checkboxVariants({ tone }), className)}
        />
        <svg
          className={styles.checkmark}
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
        >
          <path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    );
  },
);
