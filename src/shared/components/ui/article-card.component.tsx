"use client";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { TextLink } from "./text-link.component";
import { Typography } from "./typography.component";
import { Badge } from "./badge.component";
import { CompositeMedia, type CompositeImage } from "./composite-media";
import { articleVariants } from "./composites.variants";
import styles from "./composites.module.css";
export type ArticleCardProps = Omit<ComponentPropsWithoutRef<"a">, "children"> &
  VariantProps<typeof articleVariants> & {
    image: CompositeImage;
    title: string;
    headingAs?: "h2" | "h3";
    date: { day: string; month: string; year: string };
  };
export function ArticleCardDate({
  day,
  month,
  year,
}: ArticleCardProps["date"]) {
  return (
    <div className={styles.cArticleDate}>
      <Badge variant="date">{day}</Badge>
      <Badge variant="date">{month}</Badge>
      <Badge variant="year">{year}</Badge>
    </div>
  );
}
export function ArticleCardTitle({
  children,
  as = "h3",
}: {
  children: string;
  as?: "h2" | "h3";
}) {
  return (
    <Typography as={as} variant="large" className={styles.cTrim}>
      {children}
    </Typography>
  );
}
const ArticleCardRoot = forwardRef<HTMLAnchorElement, ArticleCardProps>(
  function ArticleCard(
    { image, title, headingAs, date, accent, className, ...props },
    ref,
  ) {
    return (
      <TextLink
        {...props}
        ref={ref}
        className={cn(articleVariants({ accent }), className)}
      >
        <div className={styles.cArticleImage}>
          <div className={styles.cArticleZoom}>
            <CompositeMedia image={image} />
          </div>
        </div>
        <div className={styles.cArticleBody}>
          <ArticleCardDate {...date} />
          <ArticleCardTitle as={headingAs}>{title}</ArticleCardTitle>
        </div>
      </TextLink>
    );
  },
);
export const ArticleCard = Object.assign(ArticleCardRoot, {
  Date: ArticleCardDate,
  Title: ArticleCardTitle,
});
