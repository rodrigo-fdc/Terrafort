import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Typography } from "./typography.component";
import { CompositeMedia, type CompositeImage } from "./composite-media";
import { memberVariants } from "./composites.variants";
import styles from "./composites.module.css";
export type TeamMemberCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & { image: CompositeImage; name: string; role: string };
export function TeamMemberCardCaption({
  name,
  role,
}: Pick<TeamMemberCardProps, "name" | "role">) {
  return (
    <div className={styles.cMemberCaption}>
      <div>
        <div className={styles.cMemberName}>
          <Typography as="span" variant="small" tone="light">
            {name}
          </Typography>
        </div>
        <div className={styles.cTrim}>
          <Typography as="span" tone="light" className={styles.cMemberRole}>
            {role}
          </Typography>
        </div>
      </div>
    </div>
  );
}
function TeamMemberCardRoot({
  image,
  name,
  role,
  className,
  ...props
}: TeamMemberCardProps) {
  return (
    <div {...props} className={cn(memberVariants(), className)}>
      <CompositeMedia image={image} />
      <div className={styles.cMemberGradient} />
      <TeamMemberCardCaption name={name} role={role} />
    </div>
  );
}
export const TeamMemberCard = Object.assign(TeamMemberCardRoot, {
  Caption: TeamMemberCardCaption,
});
