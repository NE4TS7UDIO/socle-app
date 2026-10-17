// Accès aux données du tableau de bord (écran 02). Phases 2 à 7 : données de démonstration ; phase 8 : requêtes Supabase.
import type { ProjectCardProps } from "@/types/socle";
import { ambiances, formatEUR, formatM2 } from "@/lib/ambiances";
import { appartement23, studioIxelles } from "@/lib/mock/appartement-2-3";
import { demoPlan, demoProjectCards, demoRenderReady, demoUser, inspirations } from "@/lib/mock/dashboard";

export type Inspiration = (typeof inspirations)[number];

export interface DashboardData {
  user: { firstName: string; city: string };
  plan: { name: string; description: string; progress: number };
  renderReady: { title: string; projectName: string; age: string; imageUrl: string; href: string } | null;
  projects: ProjectCardProps[];
  inspirations: Inspiration[];
  stats: { value: string; caption: string }[] | null;
}

export const studioHref = (projectId: string) => `/projets/${projectId}/studio`;

/** Données de la coquille (barre latérale) : utilisateur, formule, projet en cours. */
export function getShell() {
  return { user: demoUser, plan: demoPlan, currentProjectId: appartement23.id };
}

export function getDashboard(): DashboardData {
  const project = appartement23;
  const ambiance = ambiances.find((a) => a.id === project.ambiance);
  const toBuy = project.pieces.filter((p) => !p.kept);
  const budget = toBuy.reduce((sum, p) => sum + (p.priceEUR ?? 0), 0);

  return {
    user: demoUser,
    plan: demoPlan,
    renderReady: {
      title: demoRenderReady.title,
      projectName: project.name,
      age: demoRenderReady.age,
      imageUrl: demoRenderReady.imageUrl,
      href: `${studioHref(project.id)}?vue=rendus&piece=${demoRenderReady.roomId}&lumiere=${demoRenderReady.light}`,
    },
    projects: [
      {
        name: project.name,
        meta: [project.city, formatM2(Math.round(project.areaM2)), ambiance?.name].filter(Boolean).join(" · "),
        status: demoProjectCards[project.id].status,
        imageUrl: demoProjectCards[project.id].imageUrl,
        href: studioHref(project.id),
      },
      {
        name: studioIxelles.name,
        meta: studioIxelles.meta,
        status: studioIxelles.status,
        imageUrl: studioIxelles.imageUrl,
        // Plan vérifié, ambiance pas encore choisie : on reprend l'assistant à l'écran 06.
        href: `/projets/${studioIxelles.id}/ambiance`,
      },
    ],
    inspirations,
    stats: [
      { value: String(toBuy.length), caption: "meubles et objets sélectionnés" },
      { value: formatEUR(budget), caption: `budget estimé · ${project.name}` },
      { value: String(project.pieces.length - toBuy.length), caption: "pièces que tu gardes déjà" },
    ],
  };
}
