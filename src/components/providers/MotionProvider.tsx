"use client";

// Toutes les animations Motion respectent prefers-reduced-motion : plus de déplacement ni de zoom,
// seuls les fondus restent (handoff « Réduction des animations »).
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
