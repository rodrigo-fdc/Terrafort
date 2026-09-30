"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { buttonVariants } from "./ui.variants";
import { Arrow } from "./arrow.component";
import styles from "./ui.module.css";
export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "action",
      tone,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, tone }), className)}
      >
        <span className={styles.buttonLabel}>{children}</span>
        {variant === "action" && (
          <span className={styles.arrowPill} aria-hidden="true">
            <Arrow />
            <Arrow />
          </span>
        )}
      </button>
    );
  },
);
