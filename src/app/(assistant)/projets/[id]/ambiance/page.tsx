// /projets/[id]/ambiance — écran 06 · Choisir l'ambiance (assistant, étape 3).
// La barre est statique ; params est lu sous <Suspense> pour que la navigation reste instantanée (Partial Prefetching).
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AmbianceChoice } from "@/components/wizard/AmbianceChoice";
import { WizardBar } from "@/components/wizard/WizardBar";
import { assistantParams, getAssistantProject } from "@/lib/assistant";

type Params = PageProps<"/projets/[id]/ambiance">["params"];

export const metadata: Metadata = { title: "L’ambiance" };

export function generateStaticParams() {
  return assistantParams();
}

export default function AmbiancePage({ params }: PageProps<"/projets/[id]/ambiance">) {
  return (
    <>
      <WizardBar step={3} />
      <Suspense>
        <Ambiance params={params} />
      </Suspense>
    </>
  );
}

async function Ambiance({ params }: { params: Params }) {
  const { id } = await params;
  const project = getAssistantProject(id);
  if (!project) notFound();

  return (
    <AmbianceChoice
      project={project}
      backHref={`/projets/${project.id}/pieces`}
      nextHref={`/projets/${project.id}/generation`}
    />
  );
}
