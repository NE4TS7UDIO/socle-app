// /projets/nouveau — écran 03 · Importer le plan (assistant, étape 1). Hors de la coquille : pas de barre latérale.
import type { Metadata } from "next";
import { ImportPlan } from "@/components/wizard/ImportPlan";
import { WizardBar } from "@/components/wizard/WizardBar";
import { DEMO_PROJECT_ID } from "@/lib/assistant";

export const metadata: Metadata = { title: "Nouveau projet" };

export default function NewProjectPage() {
  return (
    <>
      <WizardBar step={1} />
      <ImportPlan nextHref={`/projets/${DEMO_PROJECT_ID}/lecture`} />
    </>
  );
}
