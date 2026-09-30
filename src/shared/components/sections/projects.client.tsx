"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typography } from "../ui/typography.component";
import { TestimonialCard } from "../ui/testimonial-card.component";
import { IconButton } from "../ui/icon-button.component";
import { Badge } from "../ui/badge.component";
import { Arrow } from "../ui/arrow.component";
import { SectionAction } from "./section-action.component";
import type { FeaturedProject } from "./homepage.types";
import styles from "./homepage.module.css";
export function FeaturedProjects({
  projects,
}: {
  projects: readonly FeaturedProject[];
}) {
  const root = useRef<HTMLElement>(null),
    stage = useRef<HTMLDivElement>(null),
    progress = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const match = gsap.matchMedia();
    match.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const panels = stage.current?.querySelectorAll<HTMLElement>(
          "[data-project-panel]",
        );
        if (!root.current || !stage.current || !panels?.length) return;
        gsap.set(panels, {
          clipPath: (i: number) =>
            i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
          zIndex: (i: number) => i + 1,
        });
        const timeline = gsap.timeline({
          defaults: { duration: 1, ease: "none" },
        });
        panels.forEach((panel, i) => {
          if (i) timeline.to(panel, { clipPath: "inset(0% 0 0 0)" }, i - 1);
        });
        const update = (value: number) => {
          setActive(
            Math.min(
              projects.length - 1,
              Math.floor(value * (projects.length - 1) + 0.65),
            ),
          );
          if (progress.current) gsap.set(progress.current, { scaleX: value });
        };
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (projects.length - 1)}`,
          pin: stage.current,
          pinSpacing: false,
          animation: timeline,
          scrub: 0.12,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
          onRefresh: (self) => update(self.progress),
        });
        const resize = new ResizeObserver(() => trigger.refresh());
        resize.observe(root.current);
        return () => resize.disconnect();
      },
      root,
    );
    return () => match.revert();
  }, [projects.length]);
  const current = projects[active];
  if (!current) return null;
  const move = (direction: number) => {
    if (!root.current) return;
    const index = Math.max(
      0,
      Math.min(projects.length - 1, active + direction),
    );
    const top =
      root.current.getBoundingClientRect().top +
      window.scrollY +
      index * window.innerHeight;
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section
      ref={root}
      id="projects"
      aria-label="Featured projects"
      data-home-section="projects"
      data-header-scheme="light"
      className={styles.projects}
      style={{ "--ui-home-project-count": projects.length } as CSSProperties}
    >
      <div ref={stage} className={styles.projectStage}>
        {projects.map((project) => (
          <article
            key={project.id}
            data-project-panel
            className={styles.projectPanel}
          >
            <Image
              unoptimized
              width={1920}
              height={1280}
              src={project.image.src}

              sizes="100vw"
              alt={project.image.alt}
              loading="lazy"
            />
            <div className={styles.reducedProjectCopy}>
              <div>
                <Typography
                  as="h2"
                  tone="light"
                  className={styles.projectTitle}
                >
                  {project.title}
                </Typography>
                <Typography tone="light">
                  {project.location} · {project.category}
                </Typography>
                <SectionAction
                  action={{ label: "View project", href: project.href }}
                  light
                />
              </div>
              <TestimonialCard
                quote={project.quote}
                author={project.author}
                position={project.position}
              />
            </div>
          </article>
        ))}
        <div className={`${styles.projectOverlay} ${styles.container}`}>
          <span className={styles.projectProgress} aria-hidden="true">
            <span ref={progress} />
          </span>
          <div className={styles.projectDetails}>
            <div>
              <div className={styles.projectControls}>
                <Badge tone="light">
                  {String(active + 1).padStart(2, "0")}/
                  {String(projects.length).padStart(2, "0")}
                </Badge>
                <div>
                  <IconButton
                    variant="pill"
                    tone="light"
                    aria-label="Previous project"
                    disabled={active === 0}
                    onClick={() => move(-1)}
                  >
                    <Arrow className={styles.previousArrow} />
                  </IconButton>
                  <IconButton
                    variant="pill"
                    tone="light"
                    aria-label="Next project"
                    disabled={active === projects.length - 1}
                    onClick={() => move(1)}
                  >
                    <Arrow />
                  </IconButton>
                </div>
              </div>
              <Typography
                as="h2"
                tone="light"
                className={styles.projectTitle}
                aria-live="polite"
              >
                {current.title}
              </Typography>
              <div className={styles.projectMeta}>
                <Typography tone="light">{current.location}</Typography>
                <Typography tone="light">{current.category}</Typography>
              </div>
              <SectionAction
                action={{ label: "View project", href: current.href }}
                light
              />
            </div>
            <TestimonialCard
              quote={current.quote}
              author={current.author}
              position={current.position}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
