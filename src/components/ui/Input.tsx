"use client";

// Input — Figma « Input » (4:17) : 360 × 52, Body/Default, coins 2 px, padding 16.
// Fond --bg-raised comme le champ du lien (écran 11) : le contrôle se lit sans dépendre du filet (handoff « Accessibilité »).
// Focus : filet --border-strong 1,5 px. Erreur : texte --text-danger sous le champ.
// data-state="focus" force le focus (page /dev/kit).
import { useId } from "react";
import type { InputProps } from "@/types/socle";
import { Icon } from "./Icon";

export function Input({
  placeholder,
  type = "text",
  value,
  error,
  onChange,
  label,
  icon,
  readOnly,
  name,
  className,
  "data-state": state,
}: InputProps & { className?: string; "data-state"?: "focus" }) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div className={`flex w-full max-w-90 flex-col gap-2 ${className ?? ""}`}>
      <div
        data-field
        data-state={state}
        className={`flex h-13 items-center gap-2.5 rounded-sm border bg-raised px-4 text-fg transition-[border-color,outline-color] duration-150 ease-standard field-focus:border-line-strong field-focus:outline-[1.5px] field-focus:outline-offset-[-1.5px] field-focus:outline-line-strong ${
          error ? "border-fg-danger" : "border-line"
        }`}
      >
        {icon && <Icon name={icon} size={16} className="shrink-0" />}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly ?? (value !== undefined && !onChange)}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          aria-label={label ?? placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent text-body placeholder:text-fg-muted"
        />
      </div>
      {error && (
        <p id={errorId} className="text-caption text-fg-danger">
          {error}
        </p>
      )}
    </div>
  );
}
