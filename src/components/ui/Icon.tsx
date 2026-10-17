"use client";

// Icon — Figma « Icon/* » (page Components) : 35 icônes Lucide, trait 1,5, couleur = currentColor.
// « plan » est dessinée sur mesure dans Figma (carré + cloisons) : même tracé ici via createLucideIcon.
// Client : les icônes lucide-react lisent un contexte React.
import {
  ArrowRight,
  ArrowRightLeft,
  Box,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Download,
  Eye,
  File,
  Heart,
  House,
  Image,
  Layers,
  Link,
  Lock,
  MessageSquare,
  Moon,
  Move,
  Plus,
  RotateCw,
  Ruler,
  Search,
  Share,
  ShoppingBag,
  SlidersVertical,
  Sparkles,
  Sun,
  Undo2,
  Upload,
  User,
  X,
  createLucideIcon,
  type LucideIcon,
} from "lucide-react";
import type { IconName, IconProps } from "@/types/socle";

const Plan = createLucideIcon("plan", [
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", key: "frame" }],
  ["path", { d: "M3 9h10M13 9V3M13 9v6h8", key: "walls" }],
]);

export const ICONS: Record<IconName, LucideIcon> = {
  upload: Upload,
  sun: Sun,
  moon: Moon,
  share: Share,
  cube: Box,
  plan: Plan,
  image: Image,
  undo: Undo2,
  ruler: Ruler,
  plus: Plus,
  check: Check,
  close: X,
  "chevron-right": ChevronRight,
  "chevron-left": ChevronLeft,
  "chevron-down": ChevronDown,
  "arrow-right": ArrowRight,
  search: Search,
  heart: Heart,
  home: House,
  sparkle: Sparkles,
  rotate: RotateCw,
  bag: ShoppingBag,
  user: User,
  message: MessageSquare,
  link: Link,
  download: Download,
  compass: Compass,
  move: Move,
  layers: Layers,
  camera: Camera,
  file: File,
  lock: Lock,
  swap: ArrowRightLeft,
  eye: Eye,
  settings: SlidersVertical,
};

export function Icon({ name, size = 24, label, className }: IconProps & { className?: string }) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      size={size}
      strokeWidth={1.5}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
