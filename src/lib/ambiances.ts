// Les 4 ambiances de l'écran 06. Palettes = pastilles révélées au survol de la carte.
import type { AmbianceId } from "@/types/socle";

export const ambiances: {
  id: AmbianceId;
  index: string;
  name: string;
  materials: string;
  imageUrl: string;
  palette: [string, string, string, string];
}[] = [
  { id: "warm-minimal", index: "01", name: "Warm Minimal", materials: "Bouclé · chêne pâle · lin", imageUrl: "/images/ambiance-warm-minimal.jpg", palette: ["#F1EBE0", "#E6DDCD", "#C4956C", "#6B6354"] },
  { id: "belgian-modern", index: "02", name: "Belgian Modern", materials: "Travertin · chêne fumé · chrome", imageUrl: "/images/ambiance-belgian-modern.jpg", palette: ["#E9E4DA", "#CDBBA0", "#3B332A", "#A9ACAE"] },
  { id: "seventies-revival", index: "03", name: "Seventies Revival", materials: "Cognac · rouille · verre fumé", imageUrl: "/images/ambiance-seventies-revival.jpg", palette: ["#E8D6BE", "#D29A6F", "#8A5636", "#4A3B2E"] },
  { id: "japandi", index: "04", name: "Japandi", materials: "Chêne · papier · lin lavé", imageUrl: "/images/ambiance-japandi.jpg", palette: ["#EFE9DF", "#DCCBAB", "#A58B6A", "#56643F"] },
];

export const formatEUR = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
export const formatM2 = (n: number) => `${new Intl.NumberFormat("fr-BE", { maximumFractionDigits: 1 }).format(n)} m²`;
