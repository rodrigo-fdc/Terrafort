import Image from "next/image";
import { Typography } from "../ui/typography.component";
import type { PartnersData } from "./homepage.types";
import styles from "./homepage.module.css";
export function PartnersSection({ data }: { data: PartnersData }) {
  return (
    <section
      id="partners"
      data-home-section="partners"
      aria-labelledby="partners-heading"
      className={styles.partners}
    >
      <div className={`${styles.container} ${styles.partnersGrid}`}>
        <div className={styles.partnersCopy}>
          <Typography
            as="h2"
            id="partners-heading"
            className={styles.sectionHeading}
          >
            {data.title}
          </Typography>
          <Typography>{data.description}</Typography>
        </div>
        <LogoLanes data={data} count={3} />
        <LogoLanes data={data} count={2} />
      </div>
    </section>
  );
}

function LogoLanes({ data, count }: { data: PartnersData; count: 2 | 3 }) {
  return (
    <div
      className={`${styles.logoLanes} ${count === 2 ? styles.tabletLogos : styles.primaryLogos}`}
    >
      {Array.from({ length: count }, (_, lane) => lane).map((lane) => (
        <div className={styles.logoLane} key={lane}>
          <div className={styles.logoTrack}>
            {[0, 1].map((copy) => (
              <div
                className={styles.logoGroup}
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {data.logos
                  .slice(lane * (30 / count), (lane + 1) * (30 / count))
                  .map((logo) => (
                    <div className={styles.logoTile} key={logo.id}>
                      <Image
                        unoptimized
                        width={360}
                        height={360}
                        src={logo.src}
                        alt={copy === 0 ? logo.alt : ""}
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
