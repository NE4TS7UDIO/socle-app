// /dev/projets-vide — page privée : l'écran 02 sans aucun projet (état vide), dans la coquille.
import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { getDashboard } from "@/lib/dashboard";

export const metadata: Metadata = {
  title: "Projets · état vide",
  robots: { index: false, follow: false },
};

export default function EmptyProjectsPreview() {
  return <Dashboard data={{ ...getDashboard(), projects: [], renderReady: null, stats: null }} />;
}
