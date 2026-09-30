"use client";
import { motion } from "motion/react";
import { navigationItems } from "./navigation.config";
import { NavLink } from "./nav-link.component";
import styles from "./navigation.module.css";
export function NavigationPanel({
  id,
  open,
  reducedMotion,
  activeId,
  pathname,
  onNavigate,
}: {
  id: string;
  open: boolean;
  reducedMotion: boolean;
  activeId: string | null;
  pathname: string;
  onNavigate: () => void;
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
      <nav aria-label="Navegação principal" className={styles.menuInterior}>
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id}>
              <NavLink
                item={item}
                pathname={pathname}
                activeId={activeId}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
