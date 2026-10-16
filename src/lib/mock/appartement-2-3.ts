// Données de démonstration : l'Appartement 2.3 de Nate (Bruxelles), comme dans les maquettes Figma.
// Sert aux phases 1 à 7 avant Supabase. Polygones en cm (origine : coin haut-gauche du plan),
// relevés sur le plan 2D ; positions 3D à reprendre du prototype en phase 5.
import type { Project } from "@/types/socle";

export const appartement23: Project = {
  id: "appartement-2-3",
  slug: "appartement-2-3",
  name: "Appartement 2.3",
  city: "Bruxelles",
  areaM2: 91.35,
  sunrise: "east",
  ceilingHeightCm: 260,
  ambiance: "warm-minimal",
  budget: "equilibre",
  planImageUrl: "/images/plan-agence-photo.jpg",
  unlocked: false,
  share: { enabled: true, showPrices: true, allowComments: true },
  rooms: [
    { id: "sejour", name: "Séjour & cuisine", type: "sejour", areaM2: 48, polygon: [[1075, 130], [1710, 130], [1710, 515], [1525, 515], [1525, 890], [1075, 890]] },
    { id: "chambre", name: "Chambre", sourceLabel: "Slaapkamer 2", type: "chambre", areaM2: 8.7, polygon: [[765, 20], [1075, 20], [1075, 320], [765, 320]] },
    { id: "dressing", name: "Dressing", sourceLabel: "Slaapkamer 1", type: "dressing", areaM2: 12, polygon: [[360, 20], [765, 20], [765, 320], [360, 320]] },
    { id: "sdb", name: "Salle de bain", sourceLabel: "Badkamer", type: "sdb", areaM2: 5.4, polygon: [[165, 20], [360, 20], [360, 320], [165, 320]] },
    { id: "wc", name: "WC", sourceLabel: "WC", type: "wc", areaM2: 1.5, polygon: [[0, 20], [165, 20], [165, 320], [0, 320]] },
    { id: "entree", name: "Entrée", sourceLabel: "Hall", type: "entree", areaM2: 9, polygon: [[0, 320], [1075, 320], [1075, 450], [0, 450]] },
    { id: "rangement", name: "Rangement", sourceLabel: "Berging", type: "rangement", areaM2: 7.3, polygon: [[1525, 515], [1710, 515], [1710, 890], [1525, 890]] },
    { id: "terrasse-ouest", name: "Terrasse ouest", sourceLabel: "Terras", type: "terrasse", areaM2: 18, polygon: [[1080, 895], [1710, 895], [1710, 1195], [1080, 1195]] },
    { id: "terrasse-est", name: "Terrasse est", sourceLabel: "Terras", type: "balcon", areaM2: 8, polygon: [[1080, 0], [1710, 0], [1710, 130], [1080, 130]] },
  ],
  pieces: [
    {
      id: "nube", roomId: "sejour", catalogId: "cat-nube", name: "Canapé d’angle Nube", detail: "Bouclé avoine · 290 × 190",
      priceEUR: 2450, kept: false, status: "to-buy", merchant: { name: "Maison Brut", url: "#" },
      imageUrl: "/images/ambiance-warm-minimal.jpg", footprintCm: [290, 190], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "lune", roomId: "sejour", catalogId: "cat-lune", name: "Table basse Lune", detail: "Travertin · Ø 90",
      priceEUR: 690, kept: false, status: "to-buy", merchant: { name: "Atelier Lune", url: "#" },
      imageUrl: "/images/render-detail-buffet.jpg", footprintCm: [90, 90], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "champignon", roomId: "sejour", catalogId: "cat-champignon", name: "Lampe champignon", detail: "Chrome poli · H 42",
      priceEUR: 240, kept: false, status: "ordered", merchant: { name: "Chrome & Co", url: "#" },
      imageUrl: "/images/ambiance-belgian-modern.jpg", footprintCm: [35, 35], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "atelier", roomId: "sejour", catalogId: "cat-atelier", name: "Table repas Atelier", detail: "Noyer · 8 personnes",
      priceEUR: 1290, kept: false, status: "to-buy", merchant: { name: "Studio Noyer", url: "#" },
      imageUrl: "/images/render-cuisine-soir.jpg", footprintCm: [240, 100], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "douce", roomId: "sejour", catalogId: "cat-douce", name: "Chaise Douce ×8", detail: "Bouclé · pieds noyer",
      priceEUR: 1360, kept: false, status: "to-buy", merchant: { name: "Maison Brut", url: "#" },
      imageUrl: "/images/ambiance-japandi.jpg", footprintCm: [50, 55], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "arc", roomId: "sejour", catalogId: "cat-arc", name: "Lampadaire Arc", detail: "Chrome · marbre",
      priceEUR: 380, kept: false, status: "to-buy", merchant: { name: "Chrome & Co", url: "#" },
      imageUrl: "/images/ambiance-seventies-revival.jpg", footprintCm: [40, 180], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "tele", roomId: "sejour", catalogId: null, name: "Télé 75″", detail: "À toi · gardée",
      priceEUR: null, kept: true, status: "kept",
      imageUrl: "/images/render-cuisine-soir.jpg", footprintCm: [170, 10], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "lit", roomId: "chambre", catalogId: null, name: "Lit 180 × 200", detail: "À toi · tête au mur droit",
      priceEUR: null, kept: true, status: "kept",
      imageUrl: "/images/ambiance-japandi.jpg", footprintCm: [180, 200], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "linge", roomId: "chambre", catalogId: "cat-linge", name: "Linge de lit lin lavé", detail: "Avoine · 240 × 220",
      priceEUR: 190, kept: false, status: "to-buy", merchant: { name: "Linum", url: "#" },
      imageUrl: "/images/ambiance-japandi.jpg", footprintCm: [240, 220], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "chevets", roomId: "chambre", catalogId: "cat-chevets", name: "Chevets suspendus ×2", detail: "Chêne",
      priceEUR: 240, kept: false, status: "to-buy", merchant: { name: "Studio Noyer", url: "#" },
      imageUrl: "/images/render-detail-buffet.jpg", footprintCm: [40, 30], position: [0, 0, 0], rotationY: 0,
    },
    {
      id: "bureaux", roomId: "dressing", catalogId: null, name: "Bureaux assis-debout ×2", detail: "À vous · écrans 34″",
      priceEUR: null, kept: true, status: "kept",
      imageUrl: "/images/ambiance-belgian-modern.jpg", footprintCm: [160, 80], position: [0, 0, 0], rotationY: 0,
    },
  ],
};

export const studioIxelles = {
  id: "studio-ixelles",
  name: "Studio Ixelles",
  meta: "Pour louer · 38 m² · ambiance à choisir",
  status: "Plan vérifié",
  imageUrl: "/images/plan-2d-meuble.png",
} as const;
