"use client";

// Salutation de l'écran 02 : date du jour et « Bonjour » / « Bonsoir » selon l'heure, lues dans le navigateur
// (heure locale du client). Le rendu serveur met « Bonjour » sans date ; la ligne est encore masquée par
// l'animation d'entrée quand la vraie valeur arrive à l'hydratation.
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function readNow() {
  const now = new Date();
  const hour = now.getHours();
  const date = new Intl.DateTimeFormat("fr-BE", { weekday: "long", day: "numeric", month: "long" }).format(now);
  return `${hour >= 18 || hour < 5 ? "Bonsoir" : "Bonjour"}|${date}`;
}

export function Greeting({ firstName }: { firstName: string }) {
  const snapshot = useSyncExternalStore(subscribe, readNow, () => null);
  const [hello, date] = snapshot ? snapshot.split("|") : ["Bonjour", " "];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-label-s uppercase text-fg-muted">{date}</p>
      <h1 className="font-serif text-serif-greeting">
        {hello}, {firstName}.
      </h1>
    </div>
  );
}
