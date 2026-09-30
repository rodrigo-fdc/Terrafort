"use client";

import { motion } from "motion/react";
import styles from "./site-shell.module.css";

export function MobileMenu({
  open,
  reducedMotion,
  id,
}: {
  open: boolean;
  reducedMotion: boolean;
  id: string;
}) {
  return (
    <motion.div
      id={id}
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.3,
        delay: reducedMotion || !open ? 0 : 0.12,
      }}
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
      className={styles.menuContent}
    >
      <nav aria-label="Navegação" className={styles.menuInterior} />
    </motion.div>
  );
}
