// /dev/plan-de-biais — page privée : l'écran 03 au retour d'une lecture ratée (plan photographié de biais).
import type { Metadata } from "next";
import { ImportPlan } from "@/components/wizard/ImportPlan";
import { WizardBar } from "@/components/wizard/WizardBar";
import { DEMO_PROJECT_ID } from "@/lib/assistant";

export const metadata: Metadata = {
  title: "Plan illisible · de biais",
  robots: { index: false, follow: false },
};

export default function SkewedPlanPreview() {
  return (
    <>
      <WizardBar step={1} />
      <ImportPlan nextHref={`/projets/${DEMO_PROJECT_ID}/lecture`} readError="biais" />
    </>
  );
}
