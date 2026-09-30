import Image from "next/image";
import { footerContent } from "@/content/footer";
import { TextLink, Typography } from "@/shared/components/ui";
import { FooterContact } from "./footer-contact.client";
import { FooterLink } from "./footer-link.client";
import { FooterScrollMeter } from "./footer-scroll.client";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer id="footer" className={styles.footer} data-header-scheme="light">
      <div className={styles.media}>
        <Image
          src={footerContent.image}
          alt=""
          fill
          sizes="100vw"
          className={styles.mediaImage}
        />
        <FooterContact />
      </div>
      <div className={styles.body}>
        <div className={styles.identity}>
          <div className={styles.logoFrame}>
            <Image
              src={footerContent.logo}
              alt={footerContent.brand}
              width={1080}
              height={205}
              unoptimized
              className={styles.logo}
            />
          </div>
          <FooterScrollMeter />
        </div>
        <nav
          className={styles.navigation}
          aria-label={footerContent.labels.navigation}
        >
          <Typography className={styles.label}>
            {footerContent.labels.explore}
          </Typography>
          <ul>
            {footerContent.navigation.map((link) => (
              <li key={link.href}>
                <FooterLink link={link} prominent />
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.contact}>
          <div>
            <Typography className={styles.label}>
              {footerContent.labels.findUs}
            </Typography>
            <address>
              {footerContent.address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </address>
          </div>
          <div>
            <Typography className={styles.label}>
              {footerContent.labels.email}
            </Typography>
            <TextLink
              tone="light"
              className={styles.link}
              href={`mailto:${footerContent.email}`}
            >
              {footerContent.email}
            </TextLink>
          </div>
          <div>
            <Typography className={styles.label}>
              {footerContent.labels.follow}
            </Typography>
            <ul className={styles.socials}>
              {footerContent.socials.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <nav className={styles.legal} aria-label={footerContent.labels.legal}>
          <ul>
            {footerContent.legal.map((link) => (
              <li key={link.href}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.bottom}>
          <span>{footerContent.copyright}</span>
          <div className={styles.credits}>
            {footerContent.credits.map((link) => (
              <span key={link.href}>
                {link.prefix}{" "}
                <TextLink
                  tone="light"
                  className={styles.link}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </TextLink>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
