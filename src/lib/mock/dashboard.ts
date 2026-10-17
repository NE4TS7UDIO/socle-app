// Données de démonstration de l'accueil (01) et du tableau de bord (02), comme dans les maquettes Figma.
// Remplacées par Supabase en phase 8 (profil, formule, notifications).
export const demoUser = { firstName: "Nate", city: "Bruxelles" };

export const demoPlan = {
  name: "Formule Découverte",
  description: "Ton premier projet est offert. Les rendus HD se débloquent par projet.",
  progress: 0.52,
};

// Notification « rendu prêt » (bandeau de l'écran 02).
export const demoRenderReady = {
  projectId: "appartement-2-3",
  roomId: "sejour",
  light: "soir",
  title: "Le séjour en lumière du soir est prêt.",
  age: "généré il y a 4 min",
  imageUrl: "/images/studio-3d-appartement-soir.jpg",
};

// Statut et vignette des cartes projet (le statut vient du traitement du plan et de la génération).
export const demoProjectCards: Record<string, { status: string; imageUrl: string }> = {
  "appartement-2-3": { status: "Meublé · 6 pièces", imageUrl: "/images/studio-3d-appartement-matin.jpg" },
};

// « Inspirations de la semaine » (contenu éditorial).
export const inspirations = [
  { id: "seventies-revival", name: "Seventies Revival", materials: "Cognac, rouille, verre fumé", imageUrl: "/images/ambiance-seventies-revival.jpg" },
  { id: "japandi", name: "Japandi", materials: "Chêne, papier, lin", imageUrl: "/images/ambiance-japandi.jpg" },
  { id: "belgian-modern", name: "Belgian Modern", materials: "Travertin, chêne fumé, chrome", imageUrl: "/images/ambiance-belgian-modern.jpg" },
  { id: "cuisine-du-soir", name: "Cuisine du soir", materials: "Noyer, pierre noire", imageUrl: "/images/render-cuisine-soir.jpg" },
  { id: "le-detail", name: "Le détail", materials: "Noyer, travertin, chrome", imageUrl: "/images/render-detail-buffet.jpg" },
];
