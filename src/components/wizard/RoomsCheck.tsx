"use client";

// Écran 05 · Vérifier les pièces (Figma 29:112). Le plan (PlanCanvas) et la liste restent synchronisés : choisir une
// pièce d'un côté la met en avant de l'autre. Renommer, changer le type, annuler (↺ : noms et types), choisir le côté
// du lever. Une pièce sans type met sa ligne en --text-danger et désactive « C'est juste, on continue » jusqu'à
// correction. Les choix suivent l'assistant jusqu'à 07 (useAssistant).
import { useState } from "react";
import type { Project, RoomType } from "@/types/socle";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { formatM2 } from "@/lib/ambiances";
import { formatCeiling } from "@/lib/assistant";
import { initialAssistantState, useAssistant, type AssistantRoom } from "@/lib/assistant-store";
import { demoSelectedRoom } from "@/lib/mock/assistant";
import { PlanCanvas } from "./PlanCanvas";
import { RoomRow } from "./RoomRow";
import { WizardFooter } from "./WizardFooter";

interface RoomsCheckProps {
  project: Project;
  backHref: string;
  nextHref: string;
  /** Aperçu /dev : pièce livrée sans type, état non enregistré. */
  untypedRoomId?: string;
}

export function RoomsCheck({ project, backHref, nextHref, untypedRoomId }: RoomsCheckProps) {
  const [state, update] = useAssistant(
    untypedRoomId ? `apercu-sans-type-${project.id}` : project.id,
    () => {
      const initial = initialAssistantState(project);
      if (!untypedRoomId) return initial;
      return { ...initial, rooms: initial.rooms.map((room) => (room.id === untypedRoomId ? { ...room, type: null } : room)) };
    },
    { persist: !untypedRoomId },
  );
  const [selectedId, setSelectedId] = useState(
    project.rooms.some((room) => room.id === demoSelectedRoom) ? demoSelectedRoom : project.rooms[0].id,
  );
  const [history, setHistory] = useState<AssistantRoom[][]>([]);
  const [zoom, setZoom] = useState(1);

  const { rooms } = state;
  const missing = rooms.some((room) => room.type === null);

  function changeRoom(id: string, patch: Partial<AssistantRoom>) {
    setHistory((previous) => [...previous, rooms]);
    update((current) => ({ ...current, rooms: current.rooms.map((room) => (room.id === id ? { ...room, ...patch } : room)) }));
  }

  function undo() {
    const previous = history.at(-1);
    if (!previous) return;
    setHistory((stack) => stack.slice(0, -1));
    update((current) => ({ ...current, rooms: previous }));
  }

  return (
    <>
      <main className="flex gap-12 px-10 pt-6 pb-20">
        <PlanCanvas
          rooms={rooms}
          selectedId={selectedId}
          onSelect={setSelectedId}
          sunrise={state.sunrise}
          zoom={zoom}
          onZoom={setZoom}
          canUndo={history.length > 0}
          onUndo={undo}
        />

        <section className="flex w-102 shrink-0 flex-col gap-5 pt-2">
          <p className="text-label uppercase text-fg-brand">Étape 2 · Les pièces</p>
          <h1 className="font-serif text-serif-step">{rooms.length} espaces trouvés.</h1>
          <p className="text-body-s text-fg-muted">
            Vérifie les noms et l’usage de chaque pièce. On a traduit le plan du néerlandais.
          </p>
          <div className="flex flex-col gap-2">
            <ul aria-label="Pièces" className="flex flex-col">
              {rooms.map((room) => (
                <RoomRow
                  key={room.id}
                  room={room}
                  selected={room.id === selectedId}
                  onSelect={() => setSelectedId(room.id)}
                  onRename={(name) => changeRoom(room.id, { name })}
                  onType={(type: RoomType) => changeRoom(room.id, { type })}
                />
              ))}
            </ul>
            {missing && (
              <p role="alert" className="text-caption text-fg-danger">
                Choisis un type pour chaque pièce.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-label-s uppercase text-fg-muted">Où se lève le soleil ?</p>
            <Segmented
              ariaLabel="Où se lève le soleil ?"
              options={[
                { value: "east", label: "Côté terrasse est" },
                { value: "west", label: "Côté séjour" },
              ]}
              value={state.sunrise}
              onChange={(sunrise) => update((current) => ({ ...current, sunrise }))}
              className="self-start"
            />
          </div>
        </section>
      </main>

      <WizardFooter
        backHref={backHref}
        backLabel="Retour au plan"
        summary={`${formatM2(project.areaM2, 2)} · ${rooms.length} espaces · plafond ${formatCeiling(project.ceilingHeightCm)}`}
      >
        <Button label="C’est juste, on continue" href={nextHref} disabled={missing} />
      </WizardFooter>
    </>
  );
}
