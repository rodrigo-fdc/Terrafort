"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { footerContent } from "@/content/footer";
import styles from "./footer.module.css";

// The source measures screen pixels against the CSS conversion for one metre.
const PIXELS_PER_METRE = 3779.5276;
export function FooterScrollMeter() {
  const ruler = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  const [reading, setReading] = useState({ label: "0cm", comparison: -1 });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(0, window.scrollY) / PIXELS_PER_METRE;
      const maximum = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = maximum
        ? Math.min(1, Math.max(0, window.scrollY / maximum))
        : 0;
      const index = footerContent.comparisons.findLastIndex(
        (item) => item.distance <= distance,
      );
      const item = footerContent.comparisons[index];
      const label = item
        ? `${item.distance}m`
        : distance < 1
          ? `${Math.round(distance * 100)}cm`
          : `${Math.round(distance)}m`;
      setReading((previous) =>
        previous.label === label && previous.comparison === index
          ? previous
          : { label, comparison: index },
      );
      if (ruler.current && pointer.current) {
        const offset =
          (pointer.current.offsetHeight / 2 + 4) / ruler.current.offsetHeight;
        const position =
          offset + (0.15 * progress + 0.85 * progress ** 3) * (0.5 - offset);
        ruler.current.style.setProperty(
          "--footer-progress",
          `${position * 100}%`,
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    if (pointer.current) observer.observe(pointer.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const comparison = footerContent.comparisons[reading.comparison];
  return (
    <div ref={ruler} className={styles.ruler}>
      <div className={styles.ticks} aria-hidden="true" />
      <div className={styles.filledTicks} aria-hidden="true">
        <div className={styles.ticks} aria-hidden="true" />
      </div>
      <div ref={pointer} className={styles.pointer}>
        <span className={styles.connector} aria-hidden="true" />
        <div className={styles.measurement} key={reading.comparison}>
          {comparison && (
            <Image
              className={styles.comparisonImage}
              src={comparison.image}
              alt=""
              width={98}
              height={68}
            />
          )}
          <div className={styles.measurementText}>
            <span>You’ve scrolled {reading.label}</span>
            {comparison && (
              <span className={styles.comparisonText}>
                {comparison.text.split(/\[|\]/).map((part, index) =>
                  index % 2 ? (
                    <a
                      href={comparison.href ?? undefined}
                      className={styles.comparisonEmphasis}
                      key={index}
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  ),
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
