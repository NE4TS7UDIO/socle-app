"use client";

// Écran 01 · visuel (Figma 27:43) : photo Warm Minimal en thème Nuit, trois étiquettes flottantes, une légende.
// Parallaxe liée au défilement (handoff « Parallaxe au scroll ») : photo × 0,3 ; étiquettes × 0,3 / 0,6 / 1,2 ;
// ±120 px au plus. À 1440 × 900 la page ne défile pas : tout est à sa place Figma (progression 0,5 = 0 px).
// À l'ouverture, comme la timeline Figma : la photo se pose (1,04 → 1 en 6 s) et les étiquettes montent en place.
// Animations réduites : ni parallaxe ni déplacement, fondus seulement.
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { IconName } from "@/types/socle";
import { duration, ease, parallax, usePrefersReducedMotion } from "@/lib/motion";
import { Tag } from "@/components/ui/Tag";

const MAX_SHIFT = 100; // px par unité de profondeur : 1,2 → 120 px, le plafond du handoff

const tags: { label: string; icon: IconName; depth: number; position: string; delay: number; rise: number }[] = [
  { label: "Séjour · 48 m²", icon: "plan", depth: parallax.far, position: "top-[140px] left-[48px]", delay: 0.4, rise: 60 },
  { label: "Lumière du soir · ouest", icon: "sun", depth: parallax.mid, position: "top-[330px] left-[260px]", delay: 0.6, rise: 90 },
  { label: "Bouclé avoine", icon: "layers", depth: parallax.near, position: "top-[520px] left-[452px]", delay: 0.8, rise: 120 },
];

const gridLines = ["left-1/4", "left-1/2", "left-3/4"];

function useDepth(progress: MotionValue<number>, depth: number, reduce: boolean) {
  return useTransform(progress, [0, 1], reduce ? [0, 0] : [MAX_SHIFT * depth, -MAX_SHIFT * depth]);
}

function FloatingTag({ tag, progress, reduce }: { tag: (typeof tags)[number]; progress: MotionValue<number>; reduce: boolean }) {
  const y = useDepth(progress, tag.depth, reduce);
  return (
    <motion.div style={{ y }} className={`absolute ${tag.position}`}>
      <motion.div
        initial={{ opacity: 0, y: tag.rise }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { delay: tag.delay, duration: duration.base, ease: ease.standard },
          y: { delay: tag.delay, duration: 2.4, ease: ease.outExpo },
        }}
      >
        <Tag label={tag.label} icon={tag.icon} />
      </motion.div>
    </motion.div>
  );
}

export function WelcomeVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useDepth(scrollYProgress, parallax.far, reduce);

  return (
    <div ref={ref} data-theme="night" className="relative min-h-[560px] overflow-hidden bg-ground desktop:min-h-0">
      <motion.div style={{ y: photoY }} className="absolute -top-[67px] -left-[60px] h-[calc(100%+135px)] w-[calc(100%+120px)]">
        <motion.div
          className="relative size-full"
          initial={{ scale: 1.04, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 6, ease: ease.inOut }}
        >
          <Image src="/images/ambiance-warm-minimal.jpg" alt="" fill preload sizes="(min-width: 1280px) 920px, 100vw" className="object-cover" />
        </motion.div>
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-transparent from-45% to-ground/80" />
      {gridLines.map((line) => (
        <div key={line} aria-hidden className={`absolute inset-y-0 w-px bg-fg/14 ${line}`} />
      ))}

      {tags.map((tag) => (
        <FloatingTag key={tag.label} tag={tag} progress={scrollYProgress} reduce={reduce} />
      ))}

      <motion.div
        className="absolute bottom-23 left-12 flex w-130 max-w-[calc(100%-96px)] flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: duration.slow, ease: ease.outExpo }}
      >
        <p className="text-label-s uppercase text-fg-muted">Rendu Socle · Warm Minimal</p>
        <p className="font-serif text-serif-i-m text-fg italic">Ton plan, meublé comme dans un magazine.</p>
      </motion.div>
    </div>
  );
}
