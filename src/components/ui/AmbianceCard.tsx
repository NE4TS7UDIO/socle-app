"use client";

// Ambiance card — Figma « App/Ambiance card » (24:70), 316 × 460, toujours en thème Nuit.
// Survol ou focus : image × 1,08 en 450 ms, la palette et « Aperçu » montent de 34 px (out-expo).
// Sélection : filet noyer 2 px + coche, palette visible. Le choix est un radio (role="radio" dans le radiogroup
// du parent, qui gère les flèches) ; « Aperçu » est un bouton à part, posé au-dessus de la carte.
// data-state="hover" force le survol (page /dev/kit).
import Image from "next/image";
import type { Ref } from "react";
import type { AmbianceCardProps } from "@/types/socle";
import { Icon } from "./Icon";

type Props = AmbianceCardProps & {
  className?: string;
  tabIndex?: number;
  radioRef?: Ref<HTMLButtonElement>;
  eager?: boolean;
  "data-state"?: "hover";
};

const reveal = "group-hover:translate-y-0 group-focus-within:translate-y-0 group-data-[state=hover]:translate-y-0";
const show = "group-hover:opacity-100 group-focus-within:opacity-100 group-data-[state=hover]:opacity-100";

export function AmbianceCard({
  index,
  name,
  materials,
  imageUrl,
  palette,
  selected = false,
  onSelect,
  onPreview,
  className,
  tabIndex,
  radioRef,
  eager = false,
  "data-state": state,
}: Props) {
  return (
    <div
      data-theme="night"
      data-state={state}
      className={`group relative h-115 w-79 shrink-0 overflow-hidden rounded-sm bg-ground text-fg ${className ?? ""}`}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes="316px"
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-450 ease-out-expo group-hover:scale-[1.08] group-data-[state=hover]:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden
        className={`absolute inset-0 bg-linear-to-b from-transparent from-35% ${selected ? "to-ground/88" : "to-ground/78"}`}
      />
      <button
        ref={radioRef}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-label={`${name}, ${materials}`}
        tabIndex={tabIndex}
        onClick={onSelect}
        className="absolute inset-0 cursor-pointer rounded-sm focus-visible:-outline-offset-4"
      />
      {selected && <span aria-hidden className="pointer-events-none absolute inset-0 rounded-sm border-2 border-fg-brand" />}

      <p className="pointer-events-none absolute top-5 left-5 text-label-s uppercase">{index}</p>
      {selected && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-3.5 right-3.5 flex size-7 items-center justify-center rounded-full bg-brand text-fg-inverse"
        >
          <Icon name="check" size={16} />
        </span>
      )}

      <div
        className={`pointer-events-none absolute inset-x-5 bottom-4.75 flex flex-col gap-2 transition-transform duration-450 ease-out-expo motion-reduce:transition-none ${
          selected ? "translate-y-0" : `translate-y-8.5 ${reveal}`
        }`}
      >
        <p className="font-serif text-serif-i-m italic">{name}</p>
        <p className="text-label-s uppercase text-fg-muted">{materials}</p>
        <div
          className={`flex items-center gap-1.5 pt-3 transition-opacity duration-450 ease-out-expo motion-reduce:transition-none ${
            selected ? "opacity-100" : `opacity-0 ${show}`
          }`}
        >
          {palette.map((color, i) => (
            // Couleurs de la palette = données de l'ambiance (lib/ambiances.ts), pas des couleurs d'interface.
            <span key={`${color}-${i}`} aria-hidden className="size-3.5 rounded-full" style={{ backgroundColor: color }} />
          ))}
          {onPreview && (
            <button
              type="button"
              onClick={onPreview}
              aria-label={`Aperçu de l’ambiance ${name}`}
              className="pointer-events-auto ml-2.5 flex items-center gap-1.5 text-ui-s transition-colors duration-150 ease-standard hovered:text-fg-accent"
            >
              Aperçu
              <Icon name="arrow-right" size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
