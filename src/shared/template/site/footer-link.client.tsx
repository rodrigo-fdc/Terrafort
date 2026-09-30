"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FooterLink as FooterLinkData } from "@/content/footer";
import { TextLink } from "@/shared/components/ui";
import styles from "./footer.module.css";

export function FooterLink({
  link,
  prominent = false,
}: {
  link: FooterLinkData;
  prominent?: boolean;
}) {
  const pathname = usePathname();
  const className = prominent ? styles.navigationLink : styles.link;
  if (!link.external) {
    return (
      <Link
        href={link.href}
        className={className}
        aria-current={pathname === link.href ? "page" : undefined}
      >
        {link.label}
      </Link>
    );
  }
  return (
    <TextLink
      href={link.href}
      tone="light"
      className={className}
      target={link.newTab ? "_blank" : undefined}
      rel={link.newTab ? "noopener noreferrer" : undefined}
    >
      {link.label}
    </TextLink>
  );
}
