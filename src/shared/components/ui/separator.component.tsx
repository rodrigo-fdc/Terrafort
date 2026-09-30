import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { separatorVariants } from "./ui.variants";
export type SeparatorProps = ComponentPropsWithoutRef<"hr"> &
  VariantProps<typeof separatorVariants>;
export function Separator({ tone, className, ...props }: SeparatorProps) {
  return (
    <hr {...props} className={cn(separatorVariants({ tone }), className)} />
  );
}
