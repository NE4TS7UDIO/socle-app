// /projets — écran 02 · Tableau de bord.
import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { getDashboard } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Projets" };

export default function ProjectsPage() {
  return <Dashboard data={getDashboard()} />;
}
