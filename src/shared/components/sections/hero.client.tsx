"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./homepage.module.css";
export function HeroMotion({
  children,
  video,
  poster,
}: {
  children: ReactNode;
  video: string;
  poster: string;
}) {
  const root = useRef<HTMLElement>(null),
    media = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const match = gsap.matchMedia();
    match.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        media.current?.play().catch(() => {});
        gsap.to(`.${styles.heroTitle}`, {
          y: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "45% top",
            scrub: 0.5,
          },
        });
        return () => media.current?.pause();
      },
      root,
    );
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) media.current?.pause();
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        media.current?.play().catch(() => {});
    });
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      match.revert();
    };
  }, []);
  return (
    <section
      ref={root}
      id="hero"
      data-home-section="hero"
      data-header-scheme="light"
      className={styles.hero}
    >
      <div className={styles.heroMedia}>
        <video
          ref={media}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      </div>
      {children}
    </section>
  );
}
