"use client";

// Inspirations de la semaine (écran 02, Figma 27:198) : bande horizontale de cartes 340 × 300, flèches ← → d'une carte.
// Survol d'image : × 1,08 en 450 ms (comme imageHover). Clavier : la bande est focalisable et défile aux flèches.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Inspiration } from "@/lib/dashboard";
import { Icon } from "@/components/ui/Icon";

const STEP = 340 + 24; // une carte + la gouttière

const readEdges = (el: HTMLElement) => ({
  atStart: el.scrollLeft <= 1,
  atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
});

const arrowButton =
  "touch-target flex size-9 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-150 ease-standard hovered:bg-raised aria-disabled:cursor-not-allowed aria-disabled:opacity-40";

export function InspirationCarousel({ items }: { items: Inspiration[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const target = useRef<number | null>(null); // position visée pendant un défilement doux (clics rapprochés)
  const reduce = useReducedMotion();
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setEdges(readEdges(el)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Une carte par clic, calculée depuis la position visée si un défilement est en cours ; la fin de bande est une butée.
  // Aux extrémités la flèche est aria-disabled (pas disabled) pour garder le focus clavier dessus.
  function go(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const position = target.current ?? el.scrollLeft;
    if (direction < 0 ? position <= 1 : position >= max - 1) return;
    const from = position / STEP;
    const index = direction > 0 ? Math.floor(from + 0.01) + 1 : Math.ceil(from - 0.01) - 1;
    const left = Math.min(max, Math.max(0, index * STEP));
    target.current = left;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }

  function onScroll(el: HTMLUListElement) {
    setEdges(readEdges(el));
    if (target.current !== null && Math.abs(el.scrollLeft - target.current) < 2) target.current = null;
  }

  return (
    <section id="inspirations" aria-labelledby="inspirations-titre" className="flex scroll-mt-12 flex-col gap-6">
      <div className="flex items-center justify-between border-t border-line-strong pt-5">
        <h2 id="inspirations-titre" className="text-label uppercase">
          Inspirations de la semaine
        </h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-disabled={edges.atStart} aria-label="Inspiration précédente" className={arrowButton}>
            <Icon name="chevron-left" size={16} />
          </button>
          <button type="button" onClick={() => go(1)} aria-disabled={edges.atEnd} aria-label="Inspiration suivante" className={arrowButton}>
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>
      <ul
        ref={scroller}
        tabIndex={0}
        aria-label="Inspirations de la semaine"
        onScroll={(event) => onScroll(event.currentTarget)}
        onScrollEnd={() => {
          target.current = null;
        }}
        className="flex gap-6 overflow-x-auto scrollbar-none"
      >
        {items.map((item) => (
          <li key={item.id} className="group flex w-85 shrink-0 flex-col gap-3.5">
            <div className="relative h-75 overflow-hidden rounded-sm bg-stone">
              <Image
                src={item.imageUrl}
                alt=""
                fill
                sizes="340px"
                className="object-cover transition-transform duration-450 ease-out-expo group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            <p className="font-serif text-serif-i-s italic">{item.name}</p>
            <p className="text-caption text-fg-muted">{item.materials}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
