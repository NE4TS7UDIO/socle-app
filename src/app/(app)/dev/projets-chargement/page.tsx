// /dev/projets-chargement — page privée : le squelette de chargement de l'écran 02, dans la coquille.
import type { Metadata } from "next";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export const metadata: Metadata = {
  title: "Projets · chargement",
  robots: { index: false, follow: false },
};

export default function LoadingProjectsPreview() {
  return <DashboardSkeleton />;
}
