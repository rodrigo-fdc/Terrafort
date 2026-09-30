import type { Ref } from "react";
import styles from "./navigation.module.css";
export function MenuToggle({
  open,
  id,
  onToggle,
  ref,
}: {
  open: boolean;
  id: string;
  onToggle: () => void;
  ref: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      aria-controls={id}
      className={styles.toggle}
      onClick={onToggle}
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
  );
}
