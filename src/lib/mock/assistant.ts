// Données de démonstration de l'assistant (écrans 04 à 07) pour l'Appartement 2.3, relevées dans Figma.
// Remplacées par la lecture réelle du plan et la génération en phase 8.

/** 04 · Lecture du plan (Figma 28:176) : ce que l'analyse « trouve ». */
export const demoReading = {
  planLabel: "App. 2.3", // libellé lu sur le plan de l'agence
  walls: 14,
  openings: 9,
  renameExample: "Slaapkamer → Chambre",
} as const;

/** 05 · Repères du plan (Figma 29:1093), en cm dans le repère du plan : cote, abscisse des côtés est/ouest,
 *  pièce choisie à l'ouverture (le dressing, comme sur la maquette). */
export const demoCote = { x1: 360, x2: 691, y: 561, label: "400" } as const;
export const demoSunLabelX = 1080;
export const demoSelectedRoom = "dressing";

/** 06 · « Je garde » (Figma 31:259) : meubles que le client a déjà ; cochés = pièces gardées dans les données. */
export const demoKeepOptions = [
  { id: "lit", label: "Lit 180 × 200" },
  { id: "table", label: "Table 8 personnes" },
  { id: "tele", label: "Télé 75″" },
  { id: "bureaux", label: "Bureaux assis-debout" },
] as const;

/** 07 · Pièces suivies pendant la génération (Figma 32:314), les deux terrasses ensemble. */
export const demoGenerationSteps = [
  { label: "Séjour", roomIds: ["sejour"] },
  { label: "Chambre", roomIds: ["chambre"] },
  { label: "Dressing", roomIds: ["dressing"] },
  { label: "SDB", roomIds: ["sdb"] },
  { label: "Terrasses", roomIds: ["terrasse-ouest", "terrasse-est"] },
] as const;

/** 07 · Phrases d'attente (Figma 32:280). */
export const demoStatusLines = [
  "Le canapé face à la lumière du soir…",
  "Le lit 180 sous la fenêtre de la chambre…",
  "Deux bureaux assis-debout dans le dressing…",
] as const;
