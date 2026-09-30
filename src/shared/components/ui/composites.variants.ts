import { cva } from "class-variance-authority";
import styles from "./composites.module.css";
export const articleVariants = cva(
  [styles.cBase, styles.cLink, styles.cArticle],
  {
    variants: {
      accent: {
        yellow: styles.cYellow,
        blue: styles.cBlue,
        cream: styles.cCream,
      },
    },
    defaultVariants: { accent: "cream" },
  },
);
export const projectVariants = cva(styles.cBase, {
  variants: { variant: { grid: styles.cProject, list: styles.cProjectRow } },
  defaultVariants: { variant: "grid" },
});
export const serviceVariants = cva(styles.cBase, {
  variants: {
    variant: { detailed: styles.cService, compact: styles.cServiceCompact },
  },
  defaultVariants: { variant: "detailed" },
});
export const teamVariants = cva([styles.cBase, styles.cLink, styles.cTeam]);
export const memberVariants = cva([styles.cBase, styles.cMember]);
export const testimonialVariants = cva([styles.cBase, styles.cTestimonial]);
export const modalVariants = cva([styles.cBase, styles.cModal]);
