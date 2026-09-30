import { TextLink } from "../ui/text-link.component";
import { Arrow } from "../ui/arrow.component";
import type { Action } from "./homepage.types";
import styles from "./homepage.module.css";
export function SectionAction({
  action,
  light = false,
}: {
  action: Action;
  light?: boolean;
}) {
  return (
    <TextLink
      href={action.href}
      tone={light ? "light" : "dark"}
      className={styles.action}
    >
      <span>{action.label}</span>
      <span className={styles.actionArrow} aria-hidden="true">
        <Arrow />
      </span>
    </TextLink>
  );
}
