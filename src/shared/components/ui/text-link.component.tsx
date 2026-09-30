"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { textLinkVariants } from "./ui.variants";
export type TextLinkProps = ComponentPropsWithoutRef<"a"> &
  VariantProps<typeof textLinkVariants>;
export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  function TextLink({ tone, className, ...props }, ref) {
    return (
      <a
        {...props}
        ref={ref}
        className={cn(textLinkVariants({ tone }), className)}
      />
    );
  },
);
