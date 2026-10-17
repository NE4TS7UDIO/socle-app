"use client";

// Écran 07 · Génération (Figma 32:232), thème Nuit, sans barre d'assistant. Deux bandes d'images glissent en sens
// opposés (lointaine −160 px, proche +260 px par 6 s, opacités 16 et 24 %), le dôme du logo se lève en boucle,
// les phrases d'attente se relaient, les pièces se cochent une à une et la barre avance ; après 8 s (simulation
// jusqu'à la phase 8) on passe seul au Studio. La progression est annoncée (aria-live).
// Animations réduites : bandes et logo fixes, phrases en fondu seulement.
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types/socle";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ambiances } from "@/lib/ambiances";
import { GENERATION_MS, plural } from "@/lib/assistant";
import { initialAssistantState, useAssistant } from "@/lib/assistant-store";
import { duration, ease } from "@/lib/motion";
import { demoGenerationSteps, demoStatusLines } from "@/lib/mock/assistant";
import { GenerationMark } from "./GenerationMark";

// Images des bandes (Figma 32:233 et 32:244, mêmes fichiers que public/images).
const farStrip = [
  "/images/ambiance-belgian-modern.jpg",
  "/images/render-cuisine-soir.jpg",
  "/images/ambiance-japandi.jpg",
  "/images/ambiance-warm-minimal.jpg",
  "/images/ambiance-seventies-revival.jpg",
  "/images/render-detail-buffet.jpg",
  "/images/ambiance-belgian-modern.jpg",
];
const nearStrip = [
  "/images/ambiance-seventies-revival.jpg",
  "/images/studio-3d-appartement-matin.jpg",
  "/images/ambiance-warm-minimal.jpg",
  "/images/studio-3d-sejour-matin.jpg",
  "/images/ambiance-japandi.jpg",
  "/images/studio-3d-terrasse.jpg",
];

// Fin de chaque pièce, en fraction de la durée.
const ROOM_ENDS = [0.15, 0.33, 0.5, 0.68, 0.85];

export function Generation({ project, nextHref }: { project: Project; nextHref: string }) {
  const router = useRouter();
  const [state] = useAssistant(project.id, () => initialAssistantState(project));
  const [done, setDone] = useState(0); // pièces terminées
  const [line, setLine] = useState(0);

  useEffect(() => {
    router.prefetch(nextHref);
    const timers = ROOM_ENDS.map((end, i) => window.setTimeout(() => setDone(i + 1), end * GENERATION_MS));
    const lineMs = GENERATION_MS / demoStatusLines.length;
    for (let i = 1; i < demoStatusLines.length; i++) timers.push(window.setTimeout(() => setLine(i), i * lineMs));
    timers.push(window.setTimeout(() => router.replace(nextHref), GENERATION_MS));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      // Le routeur garde l'écran caché après le départ : on repart de zéro à la prochaine visite.
      setDone(0);
      setLine(0);
    };
  }, [router, nextHref]);

  const ambiance = ambiances.find((entry) => entry.id === state.ambiance);
  const placedRooms = new Set<string>(demoGenerationSteps.slice(0, done).flatMap((step) => step.roomIds));
  const placed = project.pieces.filter((piece) => placedRooms.has(piece.roomId)).length;

  return (
    <main data-theme="night" className="relative flex h-screen items-center justify-center overflow-hidden bg-ground text-fg">
      <div
        aria-hidden
        className="absolute top-17.5 -left-30 flex animate-drift gap-4 opacity-16 [--drift:-213px] motion-reduce:animate-none"
      >
        {farStrip.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-50 w-75 shrink-0 overflow-hidden rounded-sm">
            <Image src={src} alt="" fill sizes="300px" className="object-cover" />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="absolute top-150 -left-30 flex animate-drift gap-4 opacity-24 [--drift:347px] motion-reduce:animate-none"
      >
        {nearStrip.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-65 w-100 shrink-0 overflow-hidden rounded-sm">
            <Image src={src} alt="" fill sizes="400px" className="object-cover" />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(farthest-side,color-mix(in_oklab,var(--bg-ground)_92%,transparent),color-mix(in_oklab,var(--bg-ground)_55%,transparent))]"
      />

      <p className="absolute top-8 left-10 text-label-s uppercase text-fg-muted">Socle Studio</p>
      <p className="absolute top-8 right-10 text-caption text-fg-muted">Tu peux fermer cet onglet : on t’envoie un e-mail.</p>

      <div className="relative flex w-275 flex-col items-center gap-7 text-center">
        <GenerationMark />
        <p className="text-label-s uppercase text-fg-muted">
          {project.name} · {ambiance?.name}
        </p>
        <h1 className="font-serif text-serif-generation">On meuble ton appartement.</h1>
        <div className="relative h-8 w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={line}
              className="font-serif text-serif-i-status text-fg-brand italic"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.outExpo } }}
              exit={{ opacity: 0, y: -14, transition: { duration: duration.fast, ease: ease.inOut } }}
            >
              {demoStatusLines[line]}
            </motion.p>
          </AnimatePresence>
        </div>

        <ol className="flex gap-2 pt-4">
          {demoGenerationSteps.map((step, i) => {
            const status = i < done ? "done" : i === done ? "active" : "pending";
            return (
              <li
                key={step.label}
                className={`flex items-center gap-2 rounded-full border py-2 pr-3.5 pl-2.5 text-ui-s ${
                  status === "pending" ? "border-line text-fg-muted" : "border-line-strong"
                }`}
              >
                {status === "done" ? (
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-brand text-fg-inverse">
                    <Icon name="check" size={10} />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className={`size-2 rounded-full ${
                      status === "active" ? "animate-blink bg-fg-accent motion-reduce:animate-none" : "bg-fg-muted"
                    }`}
                  />
                )}
                {step.label}
                {status === "done" && <span className="sr-only">(fait)</span>}
              </li>
            );
          })}
        </ol>

        <div className="w-120">
          <ProgressBar
            value={Math.max(0.06, done / demoGenerationSteps.length)}
            label="Génération de l’appartement"
            height={2}
            fill="primary"
          />
        </div>
        <p aria-live="polite" className="text-caption text-fg-muted">
          Environ 40 secondes · {placed} {plural(placed, "meuble")} {plural(placed, "placé")} pour l’instant
        </p>
      </div>
    </main>
  );
}
