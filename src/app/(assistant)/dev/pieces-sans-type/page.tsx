// /dev/pieces-sans-type — page privée : l'écran 05 avec une pièce livrée sans type (le rangement, « Berging »).
// Ligne en --text-danger, bouton désactivé jusqu'à correction ; rien n'est enregistré.
import type { Metadata } from "next";
import { RoomsCheck } from "@/components/wizard/RoomsCheck";
import { WizardBar } from "@/components/wizard/WizardBar";
import { DEMO_PROJECT_ID, getAssistantProject } from "@/lib/assistant";

export const metadata: Metadata = {
  title: "Pièces · sans type",
  robots: { index: false, follow: false },
};

export default function UntypedRoomPreview() {
  const project = getAssistantProject(DEMO_PROJECT_ID);
  if (!project) return null;

  return (
    <>
      <WizardBar step={2} />
      <RoomsCheck
        project={project}
        backHref="/projets/nouveau"
        nextHref={`/projets/${project.id}/ambiance`}
        untypedRoomId="rangement"
      />
    </>
  );
}
