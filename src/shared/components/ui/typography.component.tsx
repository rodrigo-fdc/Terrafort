import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { typographyVariants } from "./ui.variants";
export type TypographyProps = ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof typographyVariants> & {
    as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };
export function Typography({
  as: Tag = "p",
  variant,
  tone,
  className,
  ...props
}: TypographyProps) {
  return (
    <Tag
      {...props}
      className={cn(typographyVariants({ variant, tone }), className)}
    />
  );
}
