// Tableau de bord (écran 02, Figma 27:134) : contenu à droite de la barre latérale, marges 64, sections espacées de 64.
// Sans projet : seule la carte « Nouveau projet » + 3 inspirations, ni bandeau ni résumé (handoff « Écrans & parcours »).
import type { DashboardData } from "@/lib/dashboard";
import { Reveal } from "@/components/motion/Reveal";
import { DashboardMain } from "./DashboardMain";
import { InspirationCarousel } from "./InspirationCarousel";
import { SummaryStats } from "./SummaryStats";

export function Dashboard({ data }: { data: DashboardData }) {
  const empty = data.projects.length === 0;
  return (
    <main className="flex flex-col gap-16 px-16 pt-12 pb-24">
      <DashboardMain
        firstName={data.user.firstName}
        renderReady={empty ? null : data.renderReady}
        projects={data.projects}
      />
      <Reveal>
        <InspirationCarousel items={empty ? data.inspirations.slice(0, 3) : data.inspirations} />
      </Reveal>
      {!empty && data.stats && (
        <Reveal>
          <SummaryStats stats={data.stats} />
        </Reveal>
      )}
    </main>
  );
}
