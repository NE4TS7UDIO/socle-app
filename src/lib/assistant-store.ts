// État de l'assistant partagé entre les écrans 05, 06 et 07 (pièces, soleil, ambiance, budget, meubles gardés).
// Gardé le temps de la session (sessionStorage) jusqu'à l'enregistrement réel en phase 8.
// Sûr à l'hydratation : le rendu serveur et la première passe client lisent l'état initial, puis l'état enregistré.
import { useSyncExternalStore } from "react";
import type { AmbianceId, Budget, Project, Room, RoomType } from "@/types/socle";
import { demoKeepOptions } from "@/lib/mock/assistant";

/** Pièce en cours de vérification : le type peut manquer (ligne en erreur sur l'écran 05). */
export interface AssistantRoom extends Omit<Room, "type"> {
  type: RoomType | null;
}

export interface KeepItem {
  id: string;
  label: string;
  kept: boolean;
}

export interface AssistantState {
  rooms: AssistantRoom[];
  sunrise: "east" | "west"; // côté du lever : east = côté terrasse est (haut du plan), west = côté séjour
  ambiance: AmbianceId;
  budget: Budget;
  keep: KeepItem[];
}

export function initialAssistantState(project: Project): AssistantState {
  return {
    rooms: project.rooms.map((room) => ({ ...room })),
    sunrise: project.sunrise === "west" ? "west" : "east",
    ambiance: project.ambiance,
    budget: project.budget,
    keep: demoKeepOptions.map((option) => ({
      ...option,
      kept: project.pieces.some((piece) => piece.id === option.id && piece.kept),
    })),
  };
}

type Recipe = (state: AssistantState) => AssistantState;

interface Store {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => AssistantState;
  getServerSnapshot: () => AssistantState;
  update: (recipe: Recipe) => void;
}

const VERSION = 1;
const stores = new Map<string, Store>();

function createStore(key: string, initial: AssistantState, persist: boolean): Store {
  const storageKey = `socle:assistant:${key}`;
  const listeners = new Set<() => void>();
  let state = initial;
  let loaded = !persist;

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      if (!loaded) {
        loaded = true;
        try {
          const saved = JSON.parse(window.sessionStorage.getItem(storageKey) ?? "null");
          if (saved?.version === VERSION && saved.state) state = saved.state;
        } catch {
          // Stockage indisponible (navigation privée, aperçu) : on garde l'état initial.
        }
      }
      return state;
    },
    getServerSnapshot: () => initial,
    update(recipe) {
      state = recipe(state);
      if (persist) {
        try {
          window.sessionStorage.setItem(storageKey, JSON.stringify({ version: VERSION, state }));
        } catch {
          // Idem : l'état reste en mémoire pour cette page.
        }
      }
      listeners.forEach((listener) => listener());
    },
  };
}

/**
 * État de l'assistant pour un projet. `key` = id du projet ; les aperçus /dev passent leur propre clé
 * et `persist: false` pour ne rien enregistrer.
 */
export function useAssistant(key: string, init: () => AssistantState, { persist = true } = {}) {
  let store = stores.get(key);
  if (!store) {
    store = createStore(key, init(), persist);
    stores.set(key, store);
  }
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  return [state, store.update] as const;
}
