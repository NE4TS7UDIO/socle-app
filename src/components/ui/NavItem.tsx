// Nav item — Figma « App/Nav item » (23:75) : Default, Hover, Active. 232 × 44, icône 18, App/UI.
// Survol : fond --bg-raised. Actif : fond --bg-inverse + aria-current="page".
// data-state="hover" force le survol (page /dev/kit).
import Link from "next/link";
import type { NavItemProps } from "@/types/socle";
import { Icon } from "./Icon";

export function NavItem({
  label,
  icon,
  href,
  active = false,
  badge,
  className,
  "data-state": state,
}: NavItemProps & { className?: string; "data-state"?: "hover" }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      data-state={state}
      className={`flex h-11 w-full max-w-58 items-center gap-3 rounded-sm px-3.5 text-ui transition-colors duration-150 ease-standard ${
        active
          ? "bg-inverse text-fg-inverse"
          : "text-fg-muted hovered:bg-raised hovered:text-fg"
      } ${className ?? ""}`}
    >
      <Icon name={icon} size={18} className="shrink-0" />
      <span className="truncate">{label}</span>
      {badge ? (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-label-s tabular-nums text-fg-inverse">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
