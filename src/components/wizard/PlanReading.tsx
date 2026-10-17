"use client";

// Écran 04 · Lecture du plan (Figma 28:176). La photo du plan sous une ligne de scan (1,8 s par aller), les étapes
// cochées une à une, la barre « Analyse », puis passage seul à l'écran 05 après 3,5 s : l'analyse est simulée
// jusqu'à la phase 8. L'étape en cours est annoncée (aria-live). Animations réduites : ni scan, ni rotation, ni
// pulsation ; les étapes avancent quand même.
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { READING_MS } from "@/lib/assistant";

// Fin de chaque étape, en fraction de la durée ; 68 % = deux étapes faites, la troisième en cours (comme le PNG).
const STEP_ENDS = [0.23, 0.46, 0.71, 0.91];
const PROGRESS = [0.12, 0.36, 0.68, 0.88, 1];

const percent = new Intl.NumberFormat("fr-BE", { style: "percent" });

interface PlanReadingProps {
  planImageUrl: string;
  planLabel: string; // « App. 2.3 »
  areaLabel: string; // « 91,35 m² »
  walls: number;
  openings: number;
  renameExample: string;
  nextHref: string;
}

export function PlanReading({ planImageUrl, planLabel, areaLabel, walls, openings, renameExample, nextHref }: PlanReadingProps) {
  const router = useRouter();
  const [done, setDone] = useState(0); // étapes terminées, 0 → 4

  useEffect(() => {
    router.prefetch(nextHref);
    const timers = STEP_ENDS.map((end, i) => window.setTimeout(() => setDone(i + 1), end * READING_MS));
    // replace : le retour depuis 05 ramène à l'import (03), pas à une lecture qui se relancerait.
    timers.push(window.setTimeout(() => router.replace(nextHref), READING_MS));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      // Le routeur garde l'écran caché après le départ : on repart de zéro à la prochaine visite.
      setDone(0);
    };
  }, [router, nextHref]);

  const steps = [
    { title: "Murs et cloisons", result: `${walls} murs` },
    { title: "Portes et fenêtres", result: `${openings} ouvertures` },
    { title: "Cotes et surfaces", result: areaLabel },
    { title: "Noms des pièces", result: renameExample },
  ];
  const progress = PROGRESS[done];

  return (
    <main className="flex gap-13 px-16 pt-16 pb-16">
      <div className="relative h-175 w-215 shrink-0 overflow-hidden rounded-sm border border-line bg-raised">
        <div className="absolute top-22.25 left-4.75 h-130 w-205">
          <Image src={planImageUrl} alt="Plan de l’agence importé" fill preload sizes="820px" className="object-contain" />
          <div aria-hidden className="absolute inset-0 bg-brand/6" />
        </div>
        <div aria-hidden className="absolute inset-x-0 top-0 h-30 animate-scan [--scan-distance:600px] motion-reduce:hidden">
          <div data-theme="night" className="absolute inset-0 bg-linear-to-b from-transparent to-fg-accent/35" />
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />
        </div>
        <p
          data-theme="night"
          className="absolute top-4.75 left-4.75 flex items-center gap-2 rounded-full bg-ground py-2 pr-3.5 pl-3 text-label-s uppercase text-fg"
        >
          <span aria-hidden className="size-2 animate-blink rounded-full bg-fg-accent motion-reduce:animate-none" />
          {planLabel} · Netto {areaLabel} détecté
        </p>
      </div>

      <section className="flex w-100 flex-col gap-8">
        <p className="text-label uppercase text-fg-brand">Étape 1 · Ton plan</p>
        <h1 className="font-serif text-serif-reading">On lit ton plan…</h1>
        <p className="text-body-s text-fg-muted">Pendant ce temps, pense à la pièce que tu préfères. On commencera par elle.</p>

        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between text-label-s uppercase">
            <span className="text-fg-muted">Analyse</span>
            <span>{percent.format(progress)}</span>
          </div>
          <ProgressBar value={progress} label="Analyse du plan" fill="primary" />
        </div>

        <ol className="flex flex-col">
          {steps.map((step, i) => {
            const state = i < done ? "done" : i === done ? "active" : "pending";
            return (
              <li key={step.title} className="flex items-center gap-3.5 border-t border-line py-4">
                {state === "done" && (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-fg-inverse">
                    <Icon name="check" size={12} />
                  </span>
                )}
                {state === "active" && (
                  <span
                    aria-hidden
                    className="size-6 shrink-0 animate-turn rounded-full border-2 border-dashed border-fg-brand motion-reduce:animate-none"
                  />
                )}
                {state === "pending" && <span aria-hidden className="size-6 shrink-0 rounded-full border border-line-strong" />}
                <div className={`flex min-w-0 flex-col gap-0.5 ${state === "pending" ? "text-fg-muted" : ""}`}>
                  <p className="text-ui">{step.title}</p>
                  <p className="text-caption text-fg-muted">{state === "active" ? "en cours…" : step.result}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p aria-live="polite" className="sr-only">
          {done < steps.length ? `${steps[done].title} : en cours…` : ""}
        </p>

        <p className="flex items-center gap-2 text-caption text-fg-muted">
          <Icon name="eye" size={14} />
          Environ 20 secondes. Tu pourras tout corriger juste après.
        </p>
      </section>
    </main>
  );
}
