import { cva } from "class-variance-authority";
import styles from "./ui.module.css";
const tone = { dark: styles.dark, light: styles.light };
export const buttonVariants = cva([styles.base, styles.button], {
  variants: {
    variant: {
      action: styles.action,
      compact: styles.compact,
      text: styles.textButton,
    },
    tone,
  },
  defaultVariants: { variant: "action", tone: "dark" },
});
export const iconButtonVariants = cva([styles.base, styles.iconButton], {
  variants: {
    variant: {
      square: styles.square,
      close: styles.close,
      pill: styles.iconPill,
    },
    tone,
  },
  defaultVariants: { variant: "square", tone: "dark" },
});
export const textLinkVariants = cva([styles.base, styles.textLink], {
  variants: { tone },
  defaultVariants: { tone: "dark" },
});
export const fieldVariants = cva([styles.base, styles.field], {
  variants: { variant: { transparent: styles.transparent } },
  defaultVariants: { variant: "transparent" },
});
export const checkboxVariants = cva([styles.base, styles.checkbox], {
  variants: { tone },
  defaultVariants: { tone: "dark" },
});
export const typographyVariants = cva(styles.base, {
  variants: {
    variant: {
      body: styles.body,
      small: styles.small,
      large: styles.large,
      heading: styles.heading,
      display: styles.display,
    },
    tone,
  },
  defaultVariants: { variant: "body", tone: "dark" },
});
export const badgeVariants = cva([styles.base, styles.badge], {
  variants: {
    variant: {
      standard: styles.standardBadge,
      date: styles.dateBadge,
      year: styles.yearBadge,
    },
    tone,
  },
  defaultVariants: { variant: "standard", tone: "dark" },
});
export const separatorVariants = cva(styles.separator, {
  variants: {
    tone: { dark: styles.darkSeparator, light: styles.lightSeparator },
  },
  defaultVariants: { tone: "dark" },
});
export const labelVariants = cva(styles.base, {
  variants: {
    variant: { field: styles.body, consent: styles.consentLabel },
    tone,
  },
  defaultVariants: { variant: "field", tone: "dark" },
});
