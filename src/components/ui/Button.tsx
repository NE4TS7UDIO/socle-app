"use client";

// Button — Figma « Button » (4:11) : Primary, Outline, Link. Hauteur 48, padding 24, Label/Default en capitales.
// Survol 150 ms : fond --bg-brand (Primary), fond --bg-raised (Outline), flèche +4 px (Link).
// Appuyé : scale 0,98. Chargement : le libellé laisse place à 3 points. Désactivé : opacité 40 %.
// data-state="hover" | "pressed" force l'état (page /dev/kit).
import Link from "next/link";
import type { ButtonProps } from "@/types/socle";

type Props = ButtonProps & {
  className?: string;
  type?: "button" | "submit";
  "data-state"?: "hover" | "pressed";
};

const variants = {
  primary: "h-12 bg-inverse px-6 text-fg-inverse hovered:bg-brand",
  outline: "h-12 border border-line-strong px-6 text-fg hovered:bg-raised",
  link: "py-2 text-fg",
} as const;

const dotDelays = ["[animation-delay:0ms]", "[animation-delay:160ms]", "[animation-delay:320ms]"];

export function Button({
  label,
  variant = "primary",
  showArrow = true,
  fullWidth = false,
  loading = false,
  disabled = false,
  href,
  onClick,
  className,
  type = "button",
  "data-state": state,
}: Props) {
  const classes = [
    "group relative inline-flex items-center gap-2 rounded-sm text-label uppercase whitespace-nowrap select-none",
    "transition-[background-color,color,scale] duration-150 ease-standard",
    "pressed:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-40 aria-disabled:cursor-not-allowed",
    variants[variant],
    fullWidth ? "w-full" : "",
    className ?? "",
  ].join(" ");

  const content = (
    <>
      <span className={loading ? "opacity-0" : undefined}>{label}</span>
      {showArrow && (
        <span
          aria-hidden
          className={`${loading ? "opacity-0" : ""} ${
            variant === "link"
              ? "transition-transform duration-150 ease-standard group-hover:translate-x-1 group-data-[state=hover]:translate-x-1"
              : ""
          }`}
        >
          →
        </span>
      )}
      {loading && (
        <span aria-hidden className="absolute inset-0 flex items-center justify-center gap-1">
          {dotDelays.map((delay) => (
            <span key={delay} className={`size-1 rounded-full bg-current animate-dot motion-reduce:animate-none ${delay}`} />
          ))}
        </span>
      )}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} data-state={state} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      data-state={state}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
