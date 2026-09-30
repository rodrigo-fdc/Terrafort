import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./site-shell.module.css";

type SectionStyle = CSSProperties & {
  "--block-pt-mob"?: string;
  "--block-pb-mob"?: string;
  "--block-pt-des"?: string;
  "--block-pb-des"?: string;
};
type Props = Omit<ComponentPropsWithoutRef<"section">, "style"> & {
  style?: SectionStyle;
  "data-header-scheme"?: "light" | "dark";
};
export function SectionWrapper({ className = "", children, ...props }: Props) {
  return (
    <section {...props} className={`${styles.section} ${className}`}>
      {children}
    </section>
  );
}
