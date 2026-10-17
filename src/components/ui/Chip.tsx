"use client";

// Chip — Figma « Chip » (4:16) : Default, Selected. Hauteur 32, Label/Default en capitales, pilule.
// Default : filet + texte atténué (Figma) ; survol : filet --border-strong. Selected : fond --bg-inverse.
// Bascule : aria-pressed. data-state="hover" force le survol (page /dev/kit).
import type { ChipProps } from "@/types/socle";

export function Chip({
  label,
  selected = false,
  onToggle,
  className,
  "data-state": state,
}: ChipProps & { className?: string; "data-state"?: "hover" }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onToggle?.(!selected)}
      data-state={state}
      className={`touch-target inline-flex h-8 items-center rounded-full border px-4 text-label uppercase whitespace-nowrap transition-colors duration-250 ease-standard ${
        selected
          ? "border-inverse bg-inverse text-fg-inverse"
          : "border-line text-fg-muted hovered:border-line-strong hovered:text-fg"
      } ${className ?? ""}`}
    >
      {label}
    </button>
  );
}
