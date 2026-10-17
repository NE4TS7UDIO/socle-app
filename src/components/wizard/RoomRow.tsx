"use client";

// Ligne de pièce de l'écran 05 (Figma 29:831) : nom (clic = renommer ; Entrée valide, Échap annule), type, surface.
// Choisie : fond --bg-raised, filet noyer à gauche, sélecteur noyer. Sans type : nom et sélecteur en --text-danger,
// option « Type ? ». Focaliser un champ de la ligne choisit la pièce (et la met en avant sur le plan).
import { useState, type KeyboardEvent } from "react";
import type { RoomType } from "@/types/socle";
import type { AssistantRoom } from "@/lib/assistant-store";
import { Icon } from "@/components/ui/Icon";
import { formatM2 } from "@/lib/ambiances";
import { roomTypeLabels } from "@/lib/assistant";

const types = Object.entries(roomTypeLabels) as [RoomType, string][];

interface RoomRowProps {
  room: AssistantRoom;
  selected: boolean;
  onSelect: () => void;
  onRename: (name: string) => void;
  onType: (type: RoomType) => void;
}

export function RoomRow({ room, selected, onSelect, onRename, onType }: RoomRowProps) {
  const [draft, setDraft] = useState<string | null>(null); // null = pas en train de renommer
  const missing = room.type === null;

  function commit() {
    const name = draft?.trim();
    if (name && name !== room.name) onRename(name);
    setDraft(null);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commit();
    if (event.key === "Escape") setDraft(null);
  }

  return (
    <li
      onClick={onSelect}
      onFocus={onSelect}
      aria-current={selected || undefined}
      className={`flex cursor-pointer items-center gap-3 border-b px-3 py-2 transition-colors duration-150 ease-standard ${
        selected ? "border-l-2 border-b-transparent border-l-fg-brand bg-raised" : "border-b-line hovered:bg-raised"
      }`}
    >
      {draft === null ? (
        <button
          type="button"
          onClick={() => setDraft(room.name)}
          aria-label={`Renommer ${room.name}`}
          title={room.name}
          className={`min-w-0 flex-1 truncate text-left text-ui underline-offset-4 hovered:underline ${missing ? "text-fg-danger" : ""}`}
        >
          {room.name}
        </button>
      ) : (
        <input
          autoFocus
          name={`nom-${room.id}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          maxLength={40}
          aria-label={`Nouveau nom pour ${room.name}`}
          className="min-w-0 flex-1 border-b border-line-strong bg-transparent text-ui"
        />
      )}

      <span
        data-field
        className={`relative inline-flex shrink-0 items-center rounded-full border has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg-brand ${
          missing ? "border-fg-danger text-fg-danger" : selected ? "border-fg-brand text-fg-brand" : "border-line text-fg-muted"
        }`}
      >
        <select
          name={`type-${room.id}`}
          value={room.type ?? ""}
          onChange={(event) => onType(event.target.value as RoomType)}
          aria-label={`Type de ${room.name}`}
          aria-invalid={missing || undefined}
          className="cursor-pointer appearance-none bg-transparent py-1.25 pr-6.5 pl-2.5 text-caption text-current field-sizing-content"
        >
          {missing && (
            <option value="" disabled>
              Type ?
            </option>
          )}
          {types.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={12} className="pointer-events-none absolute right-2" />
      </span>

      <span className="w-12 shrink-0 text-right text-caption text-fg-muted">{formatM2(room.areaM2)}</span>
    </li>
  );
}
