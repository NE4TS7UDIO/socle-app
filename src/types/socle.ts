// Socle — API des composants v1. Noms et propriétés = composants Figma (page Components).
import type { ReactNode } from "react";

export type Theme = "day" | "night";

/** Button — Style=Primary | Outline | Link. Figma : « Button ». Hauteur 48 (Primary/Outline), label en Label/Default (12 px, capitales, +12 %). */
export interface ButtonProps {
  label: string;
  variant?: "primary" | "outline" | "link";
  showArrow?: boolean; // flèche → à droite, défaut true
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

/** Segmented — 2 ou 3 options, pilule. Figma : « App/Segmented 2 », « App/Segmented 3 ». Rôle ARIA : radiogroup. */
export interface SegmentedProps<T extends string> {
  options: { value: T; label: string; icon?: IconName }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

/** Nav item — State=Default | Hover | Active. Figma : « App/Nav item ». 232 × 44. */
export interface NavItemProps {
  label: string;
  icon: IconName;
  href: string;
  active?: boolean;
  badge?: number;
}

/** Room row — ligne de pièce du Studio. Figma : « App/Room row ». */
export interface RoomRowProps {
  name: string;
  areaM2: number; // affiché « 48 m² », séparateur décimal virgule
  active?: boolean;
  status?: "furnished" | "in-progress" | "empty";
  onSelect: () => void;
}

/** Piece row — meuble dans l'inspecteur et la liste d'achats. Figma : « App/Piece row ». */
export interface PieceRowProps {
  name: string;
  detail: string; // matière · dimensions
  priceEUR: number | null; // null = « — » (meuble gardé)
  thumbnailUrl: string;
  kept?: boolean;
  onSwap?: () => void; // bouton Remplacer (32 px, apparaît plein au survol)
  onSelect?: () => void; // met le hotspot correspondant en Active dans la 3D
}

/** Hotspot — point posé sur la vue 3D. Figma : « App/Hotspot » (Default = pastille +, Active = étiquette). */
export interface HotspotProps {
  label: string;
  x: number; // coordonnées écran projetées depuis la 3D
  y: number;
  active?: boolean;
  dimmed?: boolean; // 25 % d'opacité quand un autre meuble est ouvert
  onClick: () => void;
}

/** Ambiance card — Figma : « App/Ambiance card » (Default | Hover | Selected), 316 × 460, toujours en thème Nuit. */
export interface AmbianceCardProps {
  index: string; // « 01 »
  name: string; // Bodoni italique
  materials: string; // « Bouclé · chêne pâle · lin »
  imageUrl: string;
  palette: [string, string, string, string]; // 4 hex, révélés au survol
  selected?: boolean;
  onSelect: () => void;
  onPreview?: () => void;
}

/** Project card — Figma : « App/Project card » (Default | Hover), 416 de large, image 280 de haut. */
export interface ProjectCardProps {
  name: string;
  meta: string; // « Bruxelles · 91 m² · Warm Minimal »
  status: string; // « Meublé · 6 pièces », « Plan vérifié »
  imageUrl: string;
  href: string;
}

/** Chip — Figma : « Chip » (Default | Selected). Filtres, « je garde ». */
export interface ChipProps {
  label: string;
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
}

/** Input — Figma : « Input ». */
export interface InputProps {
  placeholder: string;
  type?: "text" | "email";
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
  label?: string; // nom accessible (le dessin n'a pas de libellé visible) ; défaut = placeholder
  icon?: IconName; // icône 16 px à gauche (champ du lien, écran 11)
  readOnly?: boolean;
  name?: string; // envoi de formulaire et saisie automatique
}

/** Stat — Figma : « Stat ». Chiffre en Data/Stat (chiffres tabulaires). */
export interface StatProps {
  value: string;
  caption: string;
}

/** Modal — 10b Débloquer, 11 Partager. Toujours en thème Jour, même sur le Studio Nuit. */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string; // App/Serif M
  width?: 520 | 560;
  children: ReactNode;
}

// Composants non dessinés comme tels dans Figma, factorisés depuis les écrans (handoff « Composants »).

/** Switch — 36 × 20 (écran 11). Libellé visible porté par le parent (<label htmlFor>), sinon aria-label. */
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  disabled?: boolean;
}

/** Tag sur photo — pilule Nuit. « outline » = écran 01 (filet + icône), « solid » = écran 10 (pastille des rendus). */
export interface TagProps {
  label: string;
  icon?: IconName;
  variant?: "outline" | "solid";
}

/** Barre de progression 2–4 px (6 px pour le budget, écran 12). value entre 0 et 1. */
export interface ProgressBarProps {
  value: number;
  label: string; // nom accessible
  height?: 2 | 4 | 6;
}

/** Icône Lucide, trait 1,5, couleur = currentColor. Sans label = décorative (aria-hidden). */
export interface IconProps {
  name: IconName;
  size?: 14 | 16 | 18 | 20 | 22 | 24;
  label?: string;
}

export type IconName =
  | "upload" | "sun" | "moon" | "share" | "cube" | "plan" | "image" | "undo" | "ruler" | "plus" | "check" | "close"
  | "chevron-right" | "chevron-left" | "chevron-down" | "arrow-right" | "search" | "heart" | "home" | "sparkle"
  | "rotate" | "bag" | "user" | "message" | "link" | "download" | "compass" | "move" | "layers" | "camera"
  | "file" | "lock" | "swap" | "eye" | "settings";

// ---------- Données ----------
export type AmbianceId = "warm-minimal" | "belgian-modern" | "seventies-revival" | "japandi";
export type Budget = "essentiel" | "equilibre" | "signature";
export type RoomType = "sejour" | "chambre" | "dressing" | "sdb" | "wc" | "entree" | "rangement" | "terrasse" | "balcon";

export interface Room {
  id: string;
  name: string; // nom affiché, modifiable (« Dressing »)
  sourceLabel?: string; // libellé lu sur le plan (« Slaapkamer 1 »)
  type: RoomType;
  areaM2: number;
  polygon: [number, number][]; // en cm, origine en haut à gauche du plan
}

export interface Piece {
  id: string;
  roomId: string;
  catalogId: string | null; // null = meuble gardé par le client
  name: string;
  detail: string;
  priceEUR: number | null;
  kept: boolean;
  position: [number, number, number]; // mètres, repère du modèle 3D
  rotationY: number; // radians
  footprintCm: [number, number];
  status: "to-buy" | "ordered" | "kept";
  imageUrl?: string; // vignette (inspecteur, liste d'achats)
  merchant?: { name: string; url: string };
}

export interface Project {
  id: string;
  slug: string; // lien public /p/[slug]
  name: string;
  city: string;
  areaM2: number;
  sunrise: "east" | "west" | "north" | "south"; // côté du lever de soleil (écran 05)
  ceilingHeightCm: number;
  ambiance: AmbianceId;
  budget: Budget;
  rooms: Room[];
  pieces: Piece[];
  planImageUrl: string;
  unlocked: boolean; // 39 € payé
  share: { enabled: boolean; showPrices: boolean; allowComments: boolean; password?: string };
}
