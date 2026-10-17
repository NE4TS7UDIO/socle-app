"use client";

// Segmented — Figma « App/Segmented 2 » (23:32) et « App/Segmented 3 » (23:56).
// Pilule --bg-raised + filet, padding 4, options 16 × 8 en App/UI Small ; option active --bg-inverse.
// radiogroup : ← → (et ↑ ↓, Début, Fin) changent l'option ; la pilule active glisse (layoutId, 300 ms).
import { useId, useRef, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import type { SegmentedProps } from "@/types/socle";
import { ease } from "@/lib/motion";
import { Icon } from "./Icon";

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedProps<T> & { className?: string }) {
  const pillId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === value));

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowDown: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      ArrowUp: activeIndex - 1,
      Home: 0,
      End: options.length - 1,
    };
    if (!(event.key in target)) return;
    event.preventDefault();
    const index = (target[event.key] + options.length) % options.length;
    onChange(options[index].value);
    buttons.current[index]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={`inline-flex gap-0.5 rounded-full border border-line bg-raised p-1 ${className ?? ""}`}
    >
      {options.map((option, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={option.value}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={`touch-target flex items-center gap-1.5 rounded-full px-4 py-2 text-ui-s whitespace-nowrap transition-colors duration-250 ease-standard ${
              active ? "text-fg-inverse" : "text-fg-muted hovered:text-fg"
            }`}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                aria-hidden
                className="absolute inset-0 rounded-full bg-inverse"
                transition={{ duration: 0.3, ease: ease.outExpo }}
              />
            )}
            {option.icon && <Icon name={option.icon} size={16} className="relative" />}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
