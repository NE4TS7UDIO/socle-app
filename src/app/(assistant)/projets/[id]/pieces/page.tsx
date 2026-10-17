// /projets/[id]/pieces — écran 05 · Vérifier les pièces (assistant, étape 2).
// La barre est statique ; params est lu sous <Suspense> pour que la navigation reste instantanée (Partial Prefetching).
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RoomsCheck } from "@/components/wizard/RoomsCheck";
import { WizardBar } from "@/components/wizard/WizardBar";
import { assistantParams, getAssistantProject } from "@/lib/assistant";

type Params = PageProps<"/projets/[id]/pieces">["params"];

export const metadata: Metadata = { title: "Les pièces" };

export function generateStaticParams() {
  return assistantParams();
}

export default function RoomsPage({ params }: PageProps<"/projets/[id]/pieces">) {
  return (
    <>
      <WizardBar step={2} />
      <Suspense>
        <Rooms params={params} />
      </Suspense>
    </>
  );
}

async function Rooms({ params }: { params: Params }) {
  const { id } = await params;
  const project = getAssistantProject(id);
  if (!project) notFound();

  return <RoomsCheck project={project} backHref="/projets/nouveau" nextHref={`/projets/${project.id}/ambiance`} />;
}
