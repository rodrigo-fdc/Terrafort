export type NavigationItem = { id: string; label: string } & (
  | { kind: "route"; href: string; match: "exact" | "segment" }
  | { kind: "anchor"; pathname: string; fragment: string }
  | { kind: "external"; href: string; target?: "_blank" }
  | { kind: "contact"; href: `mailto:${string}` | `tel:${string}` }
);

// Source: Thirdway header nav, in DOM order. Keep source destinations intact.
export const sourceNavigation: readonly NavigationItem[] = [
  {
    id: "approach",
    label: "Approach",
    kind: "external",
    href: "https://www.thirdway.com/approach",
  },
  {
    id: "services",
    label: "Services",
    kind: "external",
    href: "https://www.thirdway.com/services",
  },
  {
    id: "people",
    label: "People",
    kind: "external",
    href: "https://www.thirdway.com/people",
  },
  {
    id: "projects",
    label: "Projects",
    kind: "external",
    href: "https://www.thirdway.com/projects",
  },
  {
    id: "vision",
    label: "Vision & Values",
    kind: "external",
    href: "https://www.thirdway.com/vision-and-values",
  },
  {
    id: "home",
    label: "Our Home",
    kind: "external",
    href: "https://www.thirdway.com/our-home",
  },
  {
    id: "esg",
    label: "ESG",
    kind: "external",
    href: "https://www.thirdway.com/esg",
  },
  {
    id: "journal",
    label: "Journal",
    kind: "external",
    href: "https://www.thirdway.com/journal",
  },
];
const exampleDestinations: Record<string, string> = {
  approach: "/approach",
  services: "/services",
  people: "/people",
};
export const exampleNavigation: readonly NavigationItem[] =
  sourceNavigation.map((item) =>
    exampleDestinations[item.id]
      ? {
          id: item.id,
          label: item.label,
          kind: "route",
          href: exampleDestinations[item.id],
          match: "exact",
        }
      : item,
  );
// Set to source before removing the example pages.
export const navigationVariant: "examples" | "source" = "examples";
export const navigationItems =
  navigationVariant === "examples" ? exampleNavigation : sourceNavigation;
export const contact = {
  label: "Let’s talk",
  href: "mailto:hello@thirdway.com",
} as const;
