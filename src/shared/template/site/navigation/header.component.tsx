"use client";

import { useEffect, useState, useId, useLayoutEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Logo } from "../logo.component";
import Link from "next/link";
import { NavigationPanel } from "./navigation-panel.component";
import { MenuToggle } from "./menu-toggle.component";
import { contact } from "./navigation.config";
import { useNavigationState } from "./use-navigation-state";
import styles from "./navigation.module.css";

export function Header() {
  const {
    open,
    close,
    toggle,
    desktop,
    reducedMotion,
    headerRef,
    buttonRef,
    pathname,
    activeId,
    onNavigate,
  } = useNavigationState();
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

  const [time, setTime] = useState("00:00");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    });
    const update = () => setTime(format.format(new Date()));
    const frame = requestAnimationFrame(update);
    const timer = setInterval(update, 30000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);

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
        <div
          className={styles.clock}
          data-modal-outside
          aria-label="Horário de Londres"
        >
          <span className={styles.timePill}>
            <span>{time.split(":")[0]}</span>
          </span>
          <span>:</span>
          <span className={styles.timePill}>
            <span>{time.split(":")[1]}</span>
          </span>
          <span>GMT</span>
        </div>
        <a
          className={styles.desktopContact}
          data-modal-outside
          href={contact.href}
        >
          <span>{contact.label}</span>
          <span className={styles.arrowPill} aria-hidden="true">
            {[0, 1].map((index) => (
              <svg key={index} viewBox="0 0 11 8" fill="none">
                <path
                  fill="currentColor"
                  d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z"
                />
              </svg>
            ))}
          </span>
        </a>
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
          <div className={styles.headerRow} data-header-row>
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="Thirdway — home"
              onNavigate={onNavigate}
            >
              <Logo />
            </Link>
            <div className={styles.actions}>
              <a
                className={styles.mobileContact}
                href={contact.href}
                onClick={close}
              >
                <span>{contact.label}</span>
              </a>
              <MenuToggle
                ref={buttonRef}
                open={open}
                id={menuId}
                onToggle={toggle}
              />
            </div>
          </div>
          <NavigationPanel
            id={menuId}
            open={open}
            reducedMotion={reducedMotion}
            activeId={activeId}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        </motion.div>
      </div>
    </header>
  );
}
