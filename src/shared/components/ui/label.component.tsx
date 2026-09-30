import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { labelVariants } from "./ui.variants";
export type LabelProps = ComponentPropsWithoutRef<"label"> &
  VariantProps<typeof labelVariants>;
export function Label({ variant, tone, className, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn(labelVariants({ variant, tone }), className)}
    />
  );
}
