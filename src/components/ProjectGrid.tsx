import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "./ScrollReveal";
import type { ProjectWithOwner } from "@/lib/types";

interface ProjectGridProps {
  projects: ProjectWithOwner[];
  emptyMessage?: string;
}

export function ProjectGrid({ projects, emptyMessage = "Belum ada karya." }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <ScrollReveal animation="zoom-in" duration={600}>
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block animate-bounce">🏗️</span>
          <p className="text-gray-400 text-lg">{emptyMessage}</p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <ScrollReveal
          key={project.id}
          animation="fade-up"
          delay={i * 80}
          duration={500}
        >
          <ProjectCard project={project} />
        </ScrollReveal>
      ))}
    </div>
  );
}
