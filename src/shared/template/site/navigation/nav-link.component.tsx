"use client";
import Link from "next/link";
import { flushSync } from "react-dom";
import type { MouseEvent } from "react";
import type { NavigationItem } from "./navigation.config";
import { hrefFor, normalizePath, primaryActivation } from "./navigation-state";
import styles from "./navigation.module.css";
export function NavLink({
  item,
  activeId,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  activeId: string | null;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = item.id === activeId;
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!primaryActivation(event) || event.currentTarget.target === "_blank")
      return;
    flushSync(onNavigate);
    if (
      item.kind === "anchor" &&
      normalizePath(item.pathname) === normalizePath(pathname)
    ) {
      event.preventDefault();
      const href = hrefFor(item);
      if (location.pathname + location.hash !== href)
        history.pushState(null, "", href);
      window.dispatchEvent(new Event("navigation:hash"));
    }
  };
  const props = {
    href: hrefFor(item),
    className: styles.link,
    onClick,
    "aria-current": active
      ? item.kind === "anchor"
        ? ("location" as const)
        : ("page" as const)
      : undefined,
    children: (
      <>
        <svg aria-hidden="true" viewBox="0 0 11 8" fill="none">
          <path
            fill="currentColor"
            d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z"
          />
        </svg>
        <span>{item.label}</span>
      </>
    ),
  };
  return item.kind === "route" || item.kind === "anchor" ? (
    <Link {...props} />
  ) : (
    <a
      {...props}
      target={item.kind === "external" ? item.target : undefined}
      rel={
        item.kind === "external" && item.target === "_blank"
          ? "noopener noreferrer"
          : undefined
      }
    />
  );
}
