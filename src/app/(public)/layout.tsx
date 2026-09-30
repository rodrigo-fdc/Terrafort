import type { ReactNode } from "react";
import { SiteShell } from "@/shared/template/site/site-shell.component";
export default function PublicLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
