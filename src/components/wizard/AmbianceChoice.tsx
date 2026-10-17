"use client";

// Écran 06 · Choisir l'ambiance (Figma 31:144). Quatre cartes d'ambiance (radiogroup : clic ou flèches ← →), entrée
// en profondeur (depthRise, 60 → 150 px) ; « Aperçu » ouvre la photo en grand. Budget (Segmented 3) et « Je garde »
// (chips à bascule, « + Ajouter » ouvre un petit champ : Entrée ajoute, Échap annule). Warm Minimal est pré-choisi,
// donc « Meubler l'appartement » est toujours actif dans la démo. Les choix suivent l'assistant jusqu'à 07.
import { useRef, useState, type KeyboardEvent } from "react";
import { motion, type Variants } from "motion/react";
import type { AmbianceId, Budget, Project } from "@/types/socle";
import { AmbianceCard } from "@/components/ui/AmbianceCard";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { ambiances } from "@/lib/ambiances";
import { budgetLabels, plural } from "@/lib/assistant";
import { initialAssistantState, useAssistant } from "@/lib/assistant-store";
import { depthRise, ease, riseIn } from "@/lib/motion";
import { AmbiancePreview } from "./AmbiancePreview";
import { WizardFooter } from "./WizardFooter";

const budgets = (Object.keys(budgetLabels) as Budget[]).map((value) => ({ value, label: budgetLabels[value] }));

// Options : fondu à 0,9 s, après les cartes (timeline Figma).
const optionsIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.9, duration: 0.5, ease: ease.standard } },
};

function AddKeep({ onAdd }: { onAdd: (label: string) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const [refocus, setRefocus] = useState(false);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const label = draft?.trim();
      if (label) onAdd(label);
      setDraft(null);
      setRefocus(true);
    }
    if (event.key === "Escape") {
      setDraft(null);
      setRefocus(true);
    }
  }

  if (draft === null) {
    return (
      <button
        type="button"
        autoFocus={refocus}
        onClick={() => setDraft("")}
        className="touch-target flex h-8 items-center gap-1.5 rounded-full border border-dashed border-line-strong pr-3.5 pl-3 text-ui-s transition-colors duration-150 ease-standard hovered:bg-raised"
      >
        <Icon name="plus" size={14} />
        Ajouter
      </button>
    );
  }

  return (
    <input
      autoFocus
      name="meuble-garde"
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onKeyDown={onKeyDown}
      onBlur={() => setDraft(null)}
      maxLength={40}
      aria-label="Meuble à garder"
      className="h-8 w-48 rounded-full border border-line-strong bg-transparent px-3 text-ui-s"
    />
  );
}

export function AmbianceChoice({ project, backHref, nextHref }: { project: Project; backHref: string; nextHref: string }) {
  const [state, update] = useAssistant(project.id, () => initialAssistantState(project));
  const [preview, setPreview] = useState<AmbianceId | null>(null);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  const selected = ambiances.find((ambiance) => ambiance.id === state.ambiance);
  const keptCount = state.keep.filter((item) => item.kept).length;

  function onCardsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const current = ambiances.findIndex((ambiance) => ambiance.id === state.ambiance);
    const next = (current + step + ambiances.length) % ambiances.length;
    update((s) => ({ ...s, ambiance: ambiances[next].id }));
    radios.current[next]?.focus();
  }

  return (
    <>
      <main className="flex flex-col px-16 pt-8 pb-26">
        <div className="flex items-end justify-between gap-10">
          <motion.div variants={riseIn(0.05, 20)} initial="hidden" animate="show" className="flex flex-col gap-3.5">
            <p className="text-label uppercase text-fg-brand">Étape 3 · L’ambiance</p>
            <h1 className="font-serif text-serif-step">Quelle ambiance pour l’{project.name} ?</h1>
          </motion.div>
          <p className="w-85 shrink-0 text-body-s text-fg-muted">
            Survole une carte pour la palette. Tu pourras mélanger les ambiances pièce par pièce dans le Studio.
          </p>
        </div>

        <motion.div
          role="radiogroup"
          aria-label="Ambiance"
          onKeyDown={onCardsKeyDown}
          initial="hidden"
          animate="show"
          className="mt-17 flex gap-4"
        >
          {ambiances.map((ambiance, i) => (
            <motion.div key={ambiance.id} variants={depthRise(i)}>
              <AmbianceCard
                index={ambiance.index}
                name={ambiance.name}
                materials={ambiance.materials}
                imageUrl={ambiance.imageUrl}
                palette={ambiance.palette}
                selected={ambiance.id === state.ambiance}
                onSelect={() => update((s) => ({ ...s, ambiance: ambiance.id }))}
                onPreview={() => setPreview(ambiance.id)}
                tabIndex={ambiance.id === state.ambiance ? 0 : -1}
                radioRef={(element) => {
                  radios.current[i] = element;
                }}
                eager
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={optionsIn} initial="hidden" animate="show" className="mt-7 flex items-center gap-12">
          <div className="flex items-center gap-4">
            <p className="text-label-s uppercase text-fg-muted">Budget</p>
            <Segmented
              ariaLabel="Budget"
              options={budgets}
              value={state.budget}
              onChange={(budget) => update((s) => ({ ...s, budget }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="mr-2 text-label-s uppercase text-fg-muted">Je garde</p>
            {state.keep.map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                selected={item.kept}
                onToggle={(kept) =>
                  update((s) => ({ ...s, keep: s.keep.map((entry) => (entry.id === item.id ? { ...entry, kept } : entry)) }))
                }
              />
            ))}
            <AddKeep
              onAdd={(label) =>
                update((s) => ({ ...s, keep: [...s.keep, { id: `ajout-${Date.now()}`, label, kept: true }] }))
              }
            />
          </div>
        </motion.div>
      </main>

      <WizardFooter
        backHref={backHref}
        backLabel="Retour aux pièces"
        summary={`${selected?.name ?? ""} · budget ${budgetLabels[state.budget]} · ${keptCount} ${plural(keptCount, "meuble")} ${plural(keptCount, "gardé")}`}
      >
        <Button label="Meubler l’appartement" href={nextHref} disabled={!selected} />
      </WizardFooter>

      <AmbiancePreview ambiance={ambiances.find((ambiance) => ambiance.id === preview) ?? null} onClose={() => setPreview(null)} />
    </>
  );
}
