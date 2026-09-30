import { Typography } from "../ui/typography.component";
import type { AwardData } from "./homepage.types";
import styles from "./homepage.module.css";
export function AwardSection({ data }: { data: AwardData }) {
  return (
    <section
      id="recognition"
      data-home-section="recognition"
      aria-labelledby="recognition-heading"
      className={styles.award}
    >
      <div className={styles.container}>
        <Typography
          as="h2"
          id="recognition-heading"
          className={styles.awardTitle}
        >
          {data.title}
        </Typography>
        <Typography className={styles.awardDescription}>
          {data.description}
        </Typography>
      </div>
    </section>
  );
}
