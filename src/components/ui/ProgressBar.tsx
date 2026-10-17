"use client";

// Barre de progression — 2 à 4 px (6 px pour le budget, écran 12, Figma 37:1440) :
// piste couleur du filet, remplissage noyer, bouts arrondis. Le remplissage glisse en translateX
// (transform seulement), 800 ms out-expo ; MotionProvider le rend instantané si les animations sont réduites.
import { motion } from "motion/react";
import type { ProgressBarProps } from "@/types/socle";
import { duration, ease } from "@/lib/motion";

const heights = { 2: "h-0.5", 4: "h-1", 6: "h-1.5" } as const;

export function ProgressBar({ value, label, height = 4, className }: ProgressBarProps & { className?: string }) {
  const ratio = Math.min(1, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      className={`relative w-full overflow-hidden rounded-full bg-line ${heights[height]} ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-brand"
        initial={{ x: "-100%" }}
        animate={{ x: `${(ratio - 1) * 100}%` }}
        transition={{ duration: duration.slow, ease: ease.outExpo }}
      />
    </div>
  );
}
