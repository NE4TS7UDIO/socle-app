"use client";

// Switch — 36 × 20 (écran 11, Figma 36:1279) : pastille 14 px à 3 px du bord.
// Actif : piste --bg-inverse. Inactif : piste --bg-stone (Jour : quasi identique au filet de Figma ;
// Nuit : reste visible, le filet y serait aussi sombre que la pastille). Pastille --bg-ground, glisse en 250 ms.
import type { SwitchProps } from "@/types/socle";

export function Switch({ checked, onChange, label, id, disabled, className }: SwitchProps & { className?: string }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`touch-target inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-250 ease-standard disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? "bg-inverse" : "bg-stone"
      } ${className ?? ""}`}
    >
      <span
        aria-hidden
        className={`absolute top-0.75 left-0.75 size-3.5 rounded-full bg-ground transition-transform duration-250 ease-out-expo ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
