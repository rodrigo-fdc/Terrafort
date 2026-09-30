import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import styles from "./ui.module.css";
import { badgeVariants } from "./ui.variants";
export type BadgeProps = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>;
export function Badge({
  variant,
  tone,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(badgeVariants({ variant, tone }), className)}
    >
      <span className={styles.badgeValue}>{children}</span>
    </span>
  );
}
