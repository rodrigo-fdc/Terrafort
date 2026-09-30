import type { ReactNode } from "react";
import { Header } from "./navigation/header.component";
import { Footer } from "./footer.component";
import styles from "./site-shell.module.css";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell} data-site-shell data-theme="light">
      <Header />
      <div data-shell-background>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
