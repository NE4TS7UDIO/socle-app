"use client";

// Révélation au scroll (handoff « Révélation au scroll ») : fondu + montée 24 px quand 15 % de la section
// est visible, une seule fois, jamais en sortie.
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, inViewOnce } from "@/lib/motion";

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={inViewOnce}>
      {children}
    </motion.div>
  );
}
