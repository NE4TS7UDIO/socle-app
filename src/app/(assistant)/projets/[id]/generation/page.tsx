// /projets/[id]/generation — écran 07 · Génération : thème Nuit, plein écran, passe seule au Studio.
// params est lu sous <Suspense> (navigation instantanée) ; en attendant, un fond Nuit évite un flash clair.
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Generation } from "@/components/wizard/Generation";
import { assistantParams, getAssistantProject } from "@/lib/assistant";

type Params = PageProps<"/projets/[id]/generation">["params"];

export const metadata: Metadata = { title: "Génération" };

export function generateStaticParams() {
  return assistantParams();
}

export default function GenerationPage({ params }: PageProps<"/projets/[id]/generation">) {
  return (
    <Suspense fallback={<div data-theme="night" className="h-screen bg-ground" />}>
      <GenerationScreen params={params} />
    </Suspense>
  );
}

async function GenerationScreen({ params }: { params: Params }) {
  const { id } = await params;
  const project = getAssistantProject(id);
  if (!project) notFound();

  return <Generation project={project} nextHref={`/projets/${project.id}/studio`} />;
}
