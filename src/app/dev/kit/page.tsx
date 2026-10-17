// /dev/kit — page privée : non liée depuis l'app, non indexée. Montre tout src/components/ui, Jour et Nuit côte à côte.
import type { Metadata } from "next";
import { KitBoard } from "@/components/dev/KitBoard";

export const metadata: Metadata = {
  title: "Kit UI",
  robots: { index: false, follow: false },
};

export default function KitPage() {
  return <KitBoard />;
}
