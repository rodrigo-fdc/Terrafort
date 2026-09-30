import type { ComponentPropsWithoutRef } from "react";
// SVG geometry extracted from the reference; styling and dimensions live in tokens.
export function Arrow(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 11 8"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z"
      />
    </svg>
  );
}
