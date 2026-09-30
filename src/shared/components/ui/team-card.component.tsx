"use client";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/shared/utils/cn";
import { TextLink } from "./text-link.component";
import { Typography } from "./typography.component";
import { Arrow } from "./arrow.component";
import { CompositeMedia, type CompositeImage } from "./composite-media";
import { teamVariants } from "./composites.variants";
import styles from "./composites.module.css";
export type TeamCardProps = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  image: CompositeImage;
  team: string;
  leader: string;
  byLabel?: string;
  description: string;
  mobileDescription?: string;
  signature?: ReactNode;
};
export function TeamCardTitle({
  team,
  leader,
  byLabel = "by",
  light = false,
}: Pick<TeamCardProps, "team" | "leader" | "byLabel"> & { light?: boolean }) {
  return (
    <Typography
      as="h3"
      variant="display"
      tone={light ? "light" : "dark"}
      className={styles.cTeamTitle}
    >
      <span>{team}</span>
      <span className={styles.cTeamBy}>
        {" "}
        {byLabel}
        <br />
        <span className={styles.cNoWrap}>{leader}</span>
      </span>
    </Typography>
  );
}
const TeamCardRoot = forwardRef<HTMLAnchorElement, TeamCardProps>(
  function TeamCard(
    {
      image,
      team,
      leader,
      byLabel,
      description,
      mobileDescription = description,
      signature,
      className,
      ...props
    },
    ref,
  ) {
    const title = { team, leader, byLabel };
    return (
      <TextLink {...props} ref={ref} className={cn(teamVariants(), className)}>
        <div className={styles.cTeamInner}>
          <div className={styles.cTeamDesktop}>
            <CompositeMedia image={image} />
            <div className={styles.cTeamGradient} />
            <div className={styles.cTeamShade} />
            <div className={styles.cTeamContent}>
              <TeamCardTitle {...title} light />
              {signature && (
                <div className={styles.cSignature}>{signature}</div>
              )}
              <div className={styles.cTeamReveal}>
                <div className={styles.cClip}>
                  <div className={styles.cTeamDescription}>
                    <div>
                      <Typography
                        variant="small"
                        tone="light"
                        className={styles.cTrim}
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cTeamMobile}>
            <Arrow className={styles.cTeamArrow} />
            <div className={styles.cTeamTop}>
              <div className={styles.cTeamPortrait}>
                <CompositeMedia image={image} />
              </div>
              <div className={styles.cTeamMobileTitle}>
                <TeamCardTitle {...title} />
                {signature && (
                  <div className={styles.cSignature}>{signature}</div>
                )}
              </div>
            </div>
            <span className={styles.cTeamDivider} />
            <div>
              <div>
                <Typography variant="small" className={styles.cTeamMobileCopy}>
                  {mobileDescription}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </TextLink>
    );
  },
);
export const TeamCard = Object.assign(TeamCardRoot, { Title: TeamCardTitle });
