import type { TeamCardProps } from "../ui/team-card.component";
import type { ArticleCardProps } from "../ui/article-card.component";
import type { CompositeImage } from "../ui/composite-media";
export type Action = Readonly<{ label: string; href: string }>;
export type HeroData = Readonly<{
  title: string;
  description: string;
  action: Action;
  poster: string;
  video: string;
  mobileVideo?: string;
}>;
export type TeamData = Pick<
  TeamCardProps,
  "team" | "leader" | "description" | "mobileDescription" | "image" | "href"
> & {
  id: string;
  signatureImage?: {
    desktop: string;
    mobile: string;
    width: number;
    height: number;
    desktopWidth: number;
    mobileWidth: number;
  };
};
export type TeamsData = Readonly<{
  title: string;
  description: string;
  action: Action;
  items: readonly TeamData[];
}>;
export type AwardData = Readonly<{ title: string; description: string }>;
export type FeaturedProject = Readonly<{
  id: string;
  title: string;
  location: string;
  category: string;
  href: string;
  image: CompositeImage;
  quote: string;
  author: string;
  position: string;
}>;
export type PartnersData = Readonly<{
  title: string;
  description: string;
  logos: readonly (CompositeImage & { id: string })[];
}>;
export type JournalData = Readonly<{
  title: string;
  action: Action;
  items: readonly (Pick<
    ArticleCardProps,
    "image" | "title" | "date" | "accent" | "href"
  > & { id: string })[];
}>;
