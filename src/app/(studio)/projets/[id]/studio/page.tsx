// /projets/[id]/studio — page provisoire (décision du 17/10/2026) pour parcourir 02 → 03 → … → 07 → Studio :
// rendu fixe du séjour en thème Nuit et « Retour aux projets ». Remplacée par le vrai Studio en phase 4
// (?vue=…&piece=…&lumiere=… est ignoré d'ici là). params est lu sous <Suspense> (navigation instantanée).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { assistantParams, getAssistantProject } from "@/lib/assistant";

type Params = PageProps<"/projets/[id]/studio">["params"];

export const metadata: Metadata = { title: "Studio" };

export function generateStaticParams() {
  return assistantParams();
}

export default function StudioPlaceholderPage({ params }: PageProps<"/projets/[id]/studio">) {
  return (
    <main data-theme="night" className="relative h-screen overflow-hidden bg-ground text-fg">
      <Suspense>
        <StudioStill params={params} />
      </Suspense>
      <Link
        href="/projets"
        className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-ground py-2.5 pr-4 pl-3 text-ui-s transition-colors duration-150 ease-standard hovered:bg-raised"
      >
        <Icon name="chevron-left" size={16} />
        Retour aux projets
      </Link>
    </main>
  );
}

async function StudioStill({ params }: { params: Params }) {
  const { id } = await params;
  const project = getAssistantProject(id);
  if (!project) notFound();

  return (
    <Image
      src="/images/studio-3d-sejour-matin.jpg"
      alt={`Rendu du séjour · ${project.name}`}
      fill
      preload
      sizes="100vw"
      className="object-cover"
    />
  );
}
