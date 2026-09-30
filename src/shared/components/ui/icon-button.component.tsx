"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { iconButtonVariants } from "./ui.variants";
export type IconButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof iconButtonVariants> &
  ({ "aria-label": string } | { "aria-labelledby": string });
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant, tone, className, type = "button", children, ...props },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={cn(iconButtonVariants({ variant, tone }), className)}
      >
        <span aria-hidden="true">{children}</span>
      </button>
    );
  },
);
