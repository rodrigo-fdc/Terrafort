import { HeroSection } from "@/shared/components/sections/hero.component";
import { TeamsSection } from "@/shared/components/sections/teams.component";
import { AwardSection } from "@/shared/components/sections/award.component";
import { ProjectsSection } from "@/shared/components/sections/projects.component";
import { PartnersSection } from "@/shared/components/sections/partners.component";
import { JournalSection } from "@/shared/components/sections/journal.component";
import { hero, teams, award, projects, partners, journal } from "./_mock-data";
export default function HomePage() {
  return (
    <>
      <HeroSection data={hero} />
      <TeamsSection data={teams} />
      <AwardSection data={award} />
      <ProjectsSection data={projects} />
      <PartnersSection data={partners} />
      <JournalSection data={journal} />
    </>
  );
}
