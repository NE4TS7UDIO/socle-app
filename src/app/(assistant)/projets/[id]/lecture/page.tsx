// /projets/[id]/lecture — écran 04 · Lecture du plan : analyse simulée, passe seule à 05.
// La barre est statique ; params est lu sous <Suspense> pour que la navigation reste instantanée (Partial Prefetching).
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PlanReading } from "@/components/wizard/PlanReading";
import { WizardBar } from "@/components/wizard/WizardBar";
import { formatM2 } from "@/lib/ambiances";
import { assistantParams, getAssistantProject } from "@/lib/assistant";
import { demoReading } from "@/lib/mock/assistant";

type Params = PageProps<"/projets/[id]/lecture">["params"];

export const metadata: Metadata = { title: "Lecture du plan" };

export function generateStaticParams() {
  return assistantParams();
}

export default function ReadingPage({ params }: PageProps<"/projets/[id]/lecture">) {
  return (
    <>
      <WizardBar step={1} />
      <Suspense>
        <Reading params={params} />
      </Suspense>
    </>
  );
}

async function Reading({ params }: { params: Params }) {
  const { id } = await params;
  const project = getAssistantProject(id);
  if (!project) notFound();

  return (
    <PlanReading
      planImageUrl={project.planImageUrl}
      planLabel={demoReading.planLabel}
      areaLabel={formatM2(project.areaM2, 2)}
      walls={demoReading.walls}
      openings={demoReading.openings}
      renameExample={demoReading.renameExample}
      nextHref={`/projets/${project.id}/pieces`}
    />
  );
}
