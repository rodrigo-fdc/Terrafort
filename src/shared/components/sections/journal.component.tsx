import { Typography } from "../ui/typography.component";
import { TextLink } from "../ui/text-link.component";
import { ArticleCard } from "../ui/article-card.component";
import { Carousel } from "../ui/carousel.component";
import type { JournalData } from "./homepage.types";
import styles from "./homepage.module.css";
export function JournalSection({ data }: { data: JournalData }) {
  return (
    <section
      id="journal"
      data-home-section="journal"
      aria-labelledby="journal-heading"
      className={styles.journal}
    >
      <div className={styles.container}>
        <div className={styles.journalHeading}>
          <Typography
            as="h2"
            id="journal-heading"
            className={styles.sectionHeading}
          >
            {data.title}
          </Typography>
          <TextLink
            href={data.action.href}
            className={styles.desktopJournalLink}
          >
            {data.action.label}
          </TextLink>
        </div>
        <Carousel
          variant="journal"
          label="Thirdway Journal articles"
          showControls={false}
          showCount={false}
          items={data.items.map(({ id, ...card }) => ({
            id,
            label: card.title,
            content: <ArticleCard {...card} />,
          }))}
        />
        <TextLink href={data.action.href} className={styles.mobileJournalLink}>
          {data.action.label}
        </TextLink>
      </div>
    </section>
  );
}
