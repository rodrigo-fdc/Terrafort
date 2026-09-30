"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { fieldVariants } from "./ui.variants";
import styles from "./ui.module.css";
export type TextareaProps = ComponentPropsWithoutRef<"textarea"> &
  VariantProps<typeof fieldVariants>;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ variant, className, rows = 1, ...props }, ref) {
    return (
      <textarea
        {...props}
        ref={ref}
        rows={rows}
        className={cn(fieldVariants({ variant }), styles.textarea, className)}
      />
    );
  },
);
