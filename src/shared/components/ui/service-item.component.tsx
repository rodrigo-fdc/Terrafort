import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { Typography } from "./typography.component";
import { Badge } from "./badge.component";
import { CompositeMedia, type CompositeImage } from "./composite-media";
import { serviceVariants } from "./composites.variants";
import styles from "./composites.module.css";
export type ServiceItemProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> &
  VariantProps<typeof serviceVariants> & {
    number: string;
    category: string;
    title: string;
    image: CompositeImage;
    description: ReactNode;
  };
export function ServiceItemHeading({
  number,
  category,
}: Pick<ServiceItemProps, "number" | "category">) {
  return (
    <>
      <Badge>{number}</Badge>
      <Typography as="span">{category}</Typography>
    </>
  );
}
function ServiceItemRoot({
  number,
  category,
  title,
  image,
  description,
  variant = "detailed",
  className,
  ...props
}: ServiceItemProps) {
  return (
    <div {...props} className={cn(serviceVariants({ variant }), className)}>
      <div className={styles.cServiceHeading}>
        <span className={styles.cServiceRule} aria-hidden="true" />
        <div>
          <ServiceItemHeading number={number} category={category} />
        </div>
      </div>
      <div className={styles.cServiceBody}>
        <div className={styles.cServiceImage}>
          <CompositeMedia image={image} />
        </div>
        <div className={styles.cServiceCopy}>
          <Typography
            as="h3"
            variant="heading"
            className={styles.cServiceTitle}
          >
            {title}
          </Typography>
          <div className={styles.cServiceDescription}>
            {typeof description === "string" ? (
              <Typography className={styles.cTrim}>{description}</Typography>
            ) : (
              description
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export const ServiceItem = Object.assign(ServiceItemRoot, {
  Heading: ServiceItemHeading,
});
