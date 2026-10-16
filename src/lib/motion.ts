// Socle — motion v1 (Motion pour React, paquet « motion »). Valeurs = collection « Motion » dans Figma.
import { useRef, type RefObject } from "react";
import {
  type Transition,
  type Variants,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

export const duration = { instant: 0.15, fast: 0.25, base: 0.45, slow: 0.8, cinematic: 1.2 } as const;
export const stagger = 0.08;
export const distance = { rise: 24, drawer: 60, modal: 40 } as const;
export const parallax = { far: 0.3, mid: 0.6, near: 1.2 } as const;
export const hoverZoom = 1.08;

type Bezier = [number, number, number, number];
export const ease: Record<"outExpo" | "inOut" | "standard", Bezier> = {
  outExpo: [0.16, 1, 0.3, 1],
  inOut: [0.7, 0, 0.2, 1],
  standard: [0.2, 0, 0, 1],
};

const t = (d: number, e: Bezier = ease.outExpo): Transition => ({ duration: d, ease: e });

/** Entrée d'écran : fondu + montée de 24 px. Parent = `staggerParent`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.rise },
  show: { opacity: 1, y: 0, transition: t(duration.slow) },
};

export const staggerParent = (delayChildren = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Cartes d'ambiance (écran 06) : profondeur 60 → 150 px selon l'index = parallaxe à l'entrée. */
export const depthRise = (index: number): Variants => ({
  hidden: { opacity: 0, y: 60 + index * 30 },
  show: { opacity: 1, y: 0, transition: { ...t(1), delay: 0.2 + index * 0.09 } },
});

/** Survol d'image (cartes ambiance / projet) : zoom 1,08 sur l'image seule, 450 ms. */
export const imageHover: Variants = {
  rest: { scale: 1, transition: t(duration.base) },
  hover: { scale: hoverZoom, transition: t(duration.base) },
};

/** Révélation de la palette + « Aperçu » sur la carte d'ambiance. */
export const revealUp: Variants = {
  rest: { opacity: 0, y: 34, transition: t(duration.fast) },
  hover: { opacity: 1, y: 0, transition: t(duration.base) },
};

/** Tiroir latéral (écran 09). */
export const drawer: Variants = {
  hidden: { opacity: 0, x: distance.drawer },
  show: { opacity: 1, x: 0, transition: t(0.6) },
  exit: { opacity: 0, x: distance.drawer, transition: t(duration.fast, ease.standard) },
};

/** Fenêtres modales (10b, 11) + voile. */
export const scrim: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t(0.3, ease.standard) },
  exit: { opacity: 0, transition: t(duration.fast, ease.standard) },
};
export const modal: Variants = {
  hidden: { opacity: 0, y: distance.modal, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: t(0.7) },
  exit: { opacity: 0, y: 16, transition: t(duration.fast, ease.standard) },
};

/** Navigation Studio (3D ↔ Plan ↔ Rendus, Matin ↔ Soir). */
export const studioSwap: Transition = t(duration.base);
export const lightSwap: Transition = t(duration.slow, ease.inOut);

/**
 * Parallaxe liée au scroll. Renvoie un `y` à appliquer sur le calque.
 * depth : parallax.far (fond), parallax.mid (images), parallax.near (étiquettes).
 * range : déplacement max en px de part et d'autre.
 */
export function useParallax(depth: number, range = 120): { ref: RefObject<HTMLDivElement | null>; y: MotionValue<number> } {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range * depth, -range * depth]);
  return { ref, y };
}

/** Révélation au scroll : une seule fois, quand 15 % de la section est visible. */
export const inViewOnce = { once: true, amount: 0.15 } as const;
