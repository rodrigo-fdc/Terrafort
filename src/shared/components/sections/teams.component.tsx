import Image from "next/image";
import type { CSSProperties } from "react";
import { Typography } from "../ui/typography.component";
import { TeamCard } from "../ui/team-card.component";
import { Carousel } from "../ui/carousel.component";
import { SectionAction } from "./section-action.component";
import type { TeamsData } from "./homepage.types";
import styles from "./homepage.module.css";
export function TeamsSection({ data }: { data: TeamsData }) {
  return (
    <section
      id="teams"
      data-home-section="teams"
      className={styles.teams}
      aria-labelledby="teams-heading"
    >
      <div className={styles.container}>
        <div className={styles.introduction}>
          <Typography
            as="h2"
            id="teams-heading"
            className={styles.majorHeading}
          >
            {data.title}
          </Typography>
          <div className={styles.introCopy}>
            <Typography>{data.description}</Typography>
            <SectionAction action={data.action} />
          </div>
        </div>
        <Carousel
          label="Thirdway teams"
          countLabel="Teams"
          previousLabel="Previous team"
          nextLabel="Next team"
          items={data.items.map(({ id, signatureImage, ...card }) => ({
            id,
            label: card.team,
            content: (
              <TeamCard
                {...card}
                signature={
                  signatureImage ? (
                    <picture
                      className={styles.signature}
                      style={
                        {
                          "--ui-home-signature-desktop": `${signatureImage.desktopWidth}px`,
                          "--ui-home-signature-mobile": `${signatureImage.mobileWidth}px`,
                        } as CSSProperties
                      }
                    >
                      <source
                        media="(min-width: 1024px)"
                        srcSet={signatureImage.desktop}
                      />
                      <Image
                        unoptimized
                        src={signatureImage.mobile}
                        alt=""
                        width={signatureImage.width}
                        height={signatureImage.height}
                      />
                    </picture>
                  ) : undefined
                }
              />
            ),
          }))}
        />
      </div>
    </section>
  );
}
