"use client";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { TextLink } from "./text-link.component";
import { Typography } from "./typography.component";
import { CompositeMedia, type CompositeImage } from "./composite-media";
import { projectVariants } from "./composites.variants";
import styles from "./composites.module.css";
export type ProjectCardProps = Omit<ComponentPropsWithoutRef<"a">, "children"> &
  VariantProps<typeof projectVariants> & {
    image: CompositeImage;
    title: string;
    location: string;
    category: string;
    year?: string;
    sector?: string;
    teamLogo?: ReactNode;
  };
export function ProjectCardMetadata({
  location,
  category,
}: Pick<ProjectCardProps, "location" | "category">) {
  return (
    <div className={styles.cProjectMeta}>
      <Typography as="span" className={styles.cXSmall}>
        {location}
      </Typography>
      <span className={styles.cDot} aria-hidden="true" />
      <Typography as="span" className={styles.cXSmall}>
        {category}
      </Typography>
    </div>
  );
}
const ProjectCardRoot = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  function ProjectCard(
    {
      image,
      title,
      location,
      category,
      year,
      sector,
      teamLogo,
      variant = "grid",
      className,
      ...props
    },
    ref,
  ) {
    if (variant === "list")
      return (
        <div className={cn(projectVariants({ variant }), className)}>
          <div className={styles.cProjectYear}>
            <TextLink
              {...props}
              ref={ref}
              aria-label={props["aria-label"] ?? title}
              className={cn(styles.cLink, styles.cRowLink)}
            />
            {year}
          </div>
          <div className={styles.cProjectRowTitle}>
            <Typography as="span">{title}</Typography>
          </div>
          <div className={styles.cProjectRowLogo}>{teamLogo}</div>
          <div className={styles.cProjectLocation}>
            <Typography as="span">{location}</Typography>
          </div>
          <div className={styles.cProjectSector}>
            <Typography as="span">{sector}</Typography>
          </div>
          <div className={styles.cProjectPreview} aria-hidden="true">
            <CompositeMedia image={{ ...image, alt: "" }} />
          </div>
        </div>
      );
    return (
      <TextLink
        {...props}
        ref={ref}
        className={cn(styles.cLink, projectVariants({ variant }), className)}
      >
        <div>
          <div className={styles.cProjectImage}>
            <CompositeMedia image={image} />
          </div>
          <div className={styles.cProjectInfo}>
            <div>
              <ProjectCardMetadata location={location} category={category} />
              <div className={styles.cProjectTitle}>{title}</div>
            </div>
            {teamLogo && <div className={styles.cProjectLogo}>{teamLogo}</div>}
          </div>
        </div>
      </TextLink>
    );
  },
);
export const ProjectCard = Object.assign(ProjectCardRoot, {
  Metadata: ProjectCardMetadata,
});
