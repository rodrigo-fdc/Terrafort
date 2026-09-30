import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./composites.module.css";
export type CompositeImage = Pick<
  ComponentPropsWithoutRef<"img">,
  "src" | "alt" | "srcSet" | "sizes" | "width" | "height" | "loading"
> & { src: string; alt: string; objectPosition?: string };
export function CompositeMedia({
  image,
  className,
}: {
  image: CompositeImage;
  className?: string;
}) {
  const { objectPosition, ...props } = image;
  return (
    <picture className={cn(styles.cMedia, className)}>
      {image.srcSet && <source srcSet={image.srcSet} sizes={image.sizes} />}
      <img
        {...props}
        alt={image.alt}
        loading={image.loading ?? "lazy"}
        style={{ objectPosition }}
      />
    </picture>
  );
}
