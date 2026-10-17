// Stat — Figma « Stat » (4:19) : cellule de bento 330 × 200, légende Body en bas à gauche,
// chiffre Data/Stat (chiffres tabulaires) en bas à droite. Filets en haut et à gauche pour que les cellules s'assemblent.
// La valeur arrive déjà formatée fr-BE (formatEUR, formatM2).
import type { StatProps } from "@/types/socle";

export function Stat({ value, caption, className }: StatProps & { className?: string }) {
  return (
    <div className={`flex min-h-50 items-end justify-between gap-6 border-t border-l border-line p-6 text-fg ${className ?? ""}`}>
      <p className="max-w-[170px] text-body">{caption}</p>
      <p className="text-stat tabular-nums whitespace-nowrap">{value}</p>
    </div>
  );
}
