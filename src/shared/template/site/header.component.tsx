"use client";

import { useEffect, useId, useLayoutEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Logo } from "./logo.component";
import { MobileMenu } from "./mobile-menu.component";
import { useSiteMenu } from "./use-site-menu";
import styles from "./site-shell.module.css";

export function Header() {
  const { open, close, toggle, desktop, reducedMotion, headerRef, buttonRef } =
    useSiteMenu();
  const menuId = useId();

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (
      !header ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const context = gsap.context(() => {
      gsap.fromTo(
        header,
        { yPercent: -120 },
        {
          yPercent: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.15,
          clearProps: "transform",
        },
      );
    }, header);
    return () => context.revert();
  }, [headerRef, reducedMotion]);

  useEffect(() => {
    const header = headerRef.current;
    const shell = header?.closest("[data-site-shell]");
    if (!header || !shell) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      let scheme = "dark";
      shell
        .querySelectorAll<HTMLElement>("[data-header-scheme]")
        .forEach((section) => {
          const bounds = section.getBoundingClientRect();
          if (
            getComputedStyle(section).visibility !== "hidden" &&
            bounds.top <= 44 &&
            bounds.bottom > 44
          ) {
            scheme = section.dataset.headerScheme ?? "dark";
          }
        });
      header.dataset.scheme = scheme;
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, [headerRef]);

  return (
    <header ref={headerRef} className={styles.header} data-site-header>
      <motion.div
        className={styles.backdrop}
        data-menu-backdrop
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: "linear" }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onMouseDown={close}
      />
      <div className={`${styles.container} ${styles.headerContainer}`}>
        <motion.div
          className={styles.panel}
          data-menu-panel
          data-open={open}
          role={open ? "dialog" : undefined}
          aria-modal={open || undefined}
          aria-label={open ? "Navegação" : undefined}
          initial={false}
          animate={{
            width: desktop ? (open ? 680 : 172) : "100%",
            height: open ? "auto" : 44,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.5,
            ease: [0.35, 0, 0.35, 1],
          }}
        >
          <div className={styles.headerRow}>
            <Logo />
            <button
              ref={buttonRef}
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls={menuId}
              className={styles.toggle}
              onClick={toggle}
            >
              <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d={
                    open
                      ? "m11 21.5 5.25-5.25M21.5 11l-5.25 5.25m0 0 5.25 5.25L11 11"
                      : "M8 14h15.5M8 19h15.5"
                  }
                />
              </svg>
            </button>
          </div>
          <MobileMenu id={menuId} open={open} reducedMotion={reducedMotion} />
        </motion.div>
      </div>
    </header>
  );
}
