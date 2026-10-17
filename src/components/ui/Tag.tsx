// Tag sur photo — pilule Nuit pleine (handoff « Accessibilité » : texte sur photo dans une pilule Nuit).
// outline = écran 01 (Figma 27:49) : filet --border-strong, icône 14, padding 12/14 × 8.
// solid = écran 10 (Figma 35:1053) : sans filet ni icône, padding 12 × 6. App/Label Small en capitales.
import type { TagProps } from "@/types/socle";
import { Icon } from "./Icon";

export function Tag({ label, icon, variant = "outline", className }: TagProps & { className?: string }) {
  return (
    <span
      data-theme="night"
      className={`inline-flex items-center gap-2 rounded-full bg-ground text-label-s uppercase whitespace-nowrap text-fg ${
        variant === "outline" ? "border border-line-strong py-2 pr-3.5 pl-3" : "px-3 py-1.5"
      } ${className ?? ""}`}
    >
      {icon && <Icon name={icon} size={14} className="shrink-0" />}
      {label}
    </span>
  );
}
