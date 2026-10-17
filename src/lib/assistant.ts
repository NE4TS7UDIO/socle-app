// Assistant 03 → 07 : projet de démo, libellés, durées simulées. Remplacé par les vraies données en phase 8.
import type { Budget, Project, RoomType } from "@/types/socle";
import { appartement23 } from "@/lib/mock/appartement-2-3";

export const DEMO_PROJECT_ID = appartement23.id;

/** Projet ouvert dans l'assistant ; null si l'id est inconnu (la page appelle notFound). */
export function getAssistantProject(id: string): Project | null {
  return id === appartement23.id ? appartement23 : null;
}

/** generateStaticParams des écrans /projets/[id]/… : le projet de démo est prérendu. */
export const assistantParams = () => [{ id: appartement23.id }];

export const assistantSteps = ["Ton plan", "Les pièces", "L’ambiance"] as const;

/** Types de pièce du sélecteur de l'écran 05 (Figma 29:830). */
export const roomTypeLabels: Record<RoomType, string> = {
  sejour: "Séjour",
  chambre: "Chambre",
  dressing: "Dressing + bureaux",
  sdb: "Salle de bain",
  wc: "WC",
  entree: "Entrée",
  rangement: "Rangement",
  terrasse: "Terrasse",
  balcon: "Balcon",
};

export const budgetLabels: Record<Budget, string> = {
  essentiel: "Essentiel",
  equilibre: "Équilibré",
  signature: "Signature",
};

/** Durées simulées (décision du 17/10/2026) : 04 avance après 3,5 s, 07 après 8 s. */
export const READING_MS = 3500;
export const GENERATION_MS = 8000;

/** « plafond 2,60 m » */
export const formatCeiling = (cm: number) =>
  `${new Intl.NumberFormat("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cm / 100)} m`;

/** « 3 meubles gardés », « 1 meuble gardé » */
export const plural = (n: number, singular: string, pluralForm = `${singular}s`) => (n > 1 ? pluralForm : singular);
