"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { fieldVariants } from "./ui.variants";
export type InputProps = ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof fieldVariants>;
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant, className, ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(fieldVariants({ variant }), className)}
    />
  );
});
