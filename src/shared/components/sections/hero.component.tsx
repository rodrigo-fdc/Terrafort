import { Typography } from "../ui/typography.component";
import { Arrow } from "../ui/arrow.component";
import { SectionAction } from "./section-action.component";
import { HeroMotion } from "./hero.client";
import type { HeroData } from "./homepage.types";
import styles from "./homepage.module.css";
export function HeroSection({ data }: { data: HeroData }) {
  return (
    <HeroMotion video={data.video} poster={data.poster}>
      <div className={styles.heroTitlePane}>
        <div className={styles.container}>
          <Typography as="h1" tone="light" className={styles.heroTitle}>
            {data.title}
          </Typography>
          <a href="#teams" className={styles.scrollHint}>
            Scroll <Arrow />
          </a>
        </div>
      </div>
      <div className={`${styles.container} ${styles.heroCopy}`}>
        <div>
          <Typography tone="light" className={styles.heroDescription}>
            {data.description}
          </Typography>
          <SectionAction action={data.action} light />
        </div>
      </div>
    </HeroMotion>
  );
}
