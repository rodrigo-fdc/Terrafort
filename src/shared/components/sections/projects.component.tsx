import { FeaturedProjects } from "./projects.client";
import type { FeaturedProject } from "./homepage.types";
export function ProjectsSection({
  data,
}: {
  data: readonly FeaturedProject[];
}) {
  return <FeaturedProjects projects={data} />;
}
