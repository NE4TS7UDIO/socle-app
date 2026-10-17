"use client";

// Plan de l'écran 05 (Figma 29:140) : pièces en SVG depuis rooms[].polygon (cm), fond pointillé, nom + surface,
// pièce choisie en noyer avec la bulle « « Slaapkamer 1 » → Dressing + bureaux », côtés est/ouest et lumière du
// lever (échangés par « Où se lève le soleil ? »), cote, outils et zoom. Les pièces apparaissent une à une
// (+0,07 s, × 0,96 → 1, out-expo). Ici les pièces se choisissent à la souris ; la liste à droite en est
// l'équivalent accessible (plan aria-hidden).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { IconName } from "@/types/socle";
import type { AssistantRoom } from "@/lib/assistant-store";
import { Icon } from "@/components/ui/Icon";
import { formatM2 } from "@/lib/ambiances";
import { roomTypeLabels } from "@/lib/assistant";
import { duration, ease, lightSwap } from "@/lib/motion";
import { demoCote, demoSunLabelX } from "@/lib/mock/assistant";

const SCALE = 0.3924; // px par cm à 100 % (Figma : 1 710 cm de large → 671 px)
const WALL = 2.5 / SCALE; // murs de 2,5 px, en cm
const OUTDOOR_LINE = 1 / SCALE;
const OUTDOOR_DASH = `${4 / SCALE} ${3 / SCALE}`;
export const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5];

const tools: { icon: IconName; label: string }[] = [
  { icon: "move", label: "Déplacer un mur" },
  { icon: "plus", label: "Porte" },
  { icon: "ruler", label: "Mesurer" },
];

function bounds(polygon: [number, number][]) {
  const xs = polygon.map(([x]) => x);
  const ys = polygon.map(([, y]) => y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

const isOutdoor = (room: AssistantRoom) => room.type === "terrasse" || room.type === "balcon";

interface PlanCanvasProps {
  rooms: AssistantRoom[];
  selectedId: string;
  onSelect: (id: string) => void;
  sunrise: "east" | "west";
  zoom: number;
  onZoom: (zoom: number) => void;
  canUndo: boolean;
  onUndo: () => void;
}

export function PlanCanvas({ rooms, selectedId, onSelect, sunrise, zoom, onZoom, canUndo, onUndo }: PlanCanvasProps) {
  const [settled, setSettled] = useState(false); // toutes les pièces sont apparues : la bulle peut suivre sans délai
  const width = Math.max(...rooms.flatMap((room) => room.polygon.map(([x]) => x)));
  const height = Math.max(...rooms.flatMap((room) => room.polygon.map(([, y]) => y)));
  const selected = rooms.find((room) => room.id === selectedId);
  const selectedBox = selected && bounds(selected.polygon);
  const sunAtTop = sunrise === "east";
  const zoomIndex = ZOOM_STEPS.indexOf(zoom);

  const typeLabel = selected?.type ? roomTypeLabels[selected.type] : null;
  const callout =
    selected?.sourceLabel && typeLabel && selected.sourceLabel !== typeLabel && selected.sourceLabel !== selected.name
      ? `« ${selected.sourceLabel} » → ${typeLabel}`
      : null;

  // La pièce choisie est dessinée en dernier pour que son filet passe au-dessus des murs voisins.
  const drawOrder = [...rooms.filter((room) => room.id !== selectedId), ...(selected ? [selected] : [])];

  return (
    <div className="relative h-181 w-226 shrink-0 overflow-hidden rounded-sm border border-line bg-raised">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,var(--border-strong)_0.75px,transparent_1px)] bg-size-[32px_32px] bg-position-[8.75px_8.75px] opacity-18"
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-fg-accent/14 to-transparent"
        initial={false}
        animate={{ opacity: sunAtTop ? 1 : 0 }}
        transition={lightSwap}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-fg-accent/14 to-transparent"
        initial={false}
        animate={{ opacity: sunAtTop ? 0 : 1 }}
        transition={lightSwap}
      />

      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: width * SCALE, height: height * SCALE }}
        animate={{ scale: zoom }}
        transition={{ duration: duration.base, ease: ease.outExpo }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 size-full overflow-visible">
          {drawOrder.map((room) => {
            const order = rooms.indexOf(room);
            const outdoor = isOutdoor(room);
            const active = room.id === selectedId;
            return (
              <motion.polygon
                key={room.id}
                points={room.polygon.map((point) => point.join(",")).join(" ")}
                strokeWidth={outdoor && !active ? OUTDOOR_LINE : WALL}
                strokeDasharray={outdoor && !active ? OUTDOOR_DASH : undefined}
                strokeLinejoin="miter"
                onClick={() => onSelect(room.id)}
                className={`cursor-pointer transition-colors duration-250 ease-standard ${
                  // Teintes relevées sur le PNG 05 : noyer à 12 %, pierre à 25 % sur le fond du plan.
                  active
                    ? "fill-fg-brand/12 stroke-fg-brand"
                    : outdoor
                      ? "fill-stone/25 stroke-line-strong"
                      : "fill-ground stroke-fg hover:fill-raised"
                }`}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + order * 0.07, duration: 0.6, ease: ease.outExpo }}
                onAnimationComplete={order === rooms.length - 1 ? () => setSettled(true) : undefined}
              />
            );
          })}
        </svg>

        {rooms.map((room, order) => {
          const box = bounds(room.polygon);
          const narrow = box.w * SCALE < 72;
          const name = room.type === "sdb" && room.name === roomTypeLabels.sdb && box.w * SCALE < 100 ? "SDB" : room.name;
          return (
            <motion.div
              key={room.id}
              className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 text-center whitespace-nowrap"
              style={{ left: (box.x + box.w / 2) * SCALE, top: (box.y + box.h / 2) * SCALE }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + order * 0.07, duration: 0.4, ease: ease.standard }}
            >
              <span
                className={`${narrow ? "text-caption" : "text-ui-s"} ${
                  room.id === selectedId ? "text-fg-brand" : room.type === null ? "text-fg-danger" : "text-fg"
                }`}
              >
                {name}
              </span>
              <span className="text-caption text-fg-muted">{formatM2(room.areaM2)}</span>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {callout && selectedBox && (
            <motion.p
              key={selectedId}
              data-theme="night"
              className="pointer-events-none absolute -translate-y-full rounded-full bg-ground py-2 pr-3.5 pl-3 text-label-s whitespace-nowrap text-fg uppercase"
              style={{ left: selectedBox.x * SCALE, top: selectedBox.y * SCALE - 24 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: duration.instant } }}
              transition={{ delay: settled ? 0 : 1, duration: 0.6, ease: ease.outExpo }}
            >
              {callout}
            </motion.p>
          )}
        </AnimatePresence>

        {(["east", "west"] as const).map((side) => {
          const atTop = (side === "east") === sunAtTop;
          return (
            <motion.p
              key={side}
              className={`pointer-events-none absolute top-0 flex items-center gap-2 text-label-s whitespace-nowrap uppercase ${
                side === "east" ? "text-fg-brand" : "text-fg-muted"
              }`}
              style={{ left: demoSunLabelX * SCALE }}
              initial={false}
              animate={{ y: atTop ? -101 : height * SCALE + 14 }}
              transition={lightSwap}
            >
              <Icon name={side === "east" ? "sun" : "moon"} size={16} />
              {side === "east" ? "Est · lever du soleil" : "Ouest · soirée"}
            </motion.p>
          );
        })}

        <div
          className="pointer-events-none absolute flex -translate-y-1/2 items-center gap-1.5 text-caption text-fg-muted"
          style={{ left: demoCote.x1 * SCALE, top: demoCote.y * SCALE, width: (demoCote.x2 - demoCote.x1) * SCALE }}
        >
          <span className="h-px flex-1 bg-fg-muted" />
          {demoCote.label}
          <span className="h-px flex-1 bg-fg-muted" />
        </div>
      </motion.div>

      {/* Outils de dessin affichés mais inactifs jusqu'à une phase ultérieure (décision du 17/10/2026). */}
      <div
        data-theme="night"
        role="toolbar"
        aria-label="Outils du plan"
        className="absolute bottom-6 left-6 flex items-center gap-1 rounded-full bg-ground p-1.5"
      >
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            aria-disabled="true"
            className="flex cursor-not-allowed items-center gap-2 rounded-full px-3.5 py-2.5 text-ui-s text-fg-muted"
          >
            <Icon name={tool.icon} size={16} />
            {tool.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Annuler"
          className="flex items-center rounded-full px-3.5 py-2.5 text-fg transition-colors duration-150 ease-standard hovered:bg-raised disabled:cursor-not-allowed disabled:text-fg-muted disabled:hover:bg-transparent"
        >
          <Icon name="undo" size={16} />
        </button>
      </div>

      <div className="absolute right-6 bottom-6 flex items-center gap-3 rounded-full border border-line bg-ground px-4 py-2.5">
        <button
          type="button"
          onClick={() => onZoom(ZOOM_STEPS[zoomIndex - 1])}
          disabled={zoomIndex <= 0}
          aria-label="Dézoomer"
          className="touch-target text-ui transition-opacity duration-150 ease-standard disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <span aria-live="polite" className="w-10 text-center text-ui-s text-fg-muted tabular-nums">
          {Math.round(zoom * 100)} %
        </span>
        <button
          type="button"
          onClick={() => onZoom(ZOOM_STEPS[zoomIndex + 1])}
          disabled={zoomIndex >= ZOOM_STEPS.length - 1}
          aria-label="Zoomer"
          className="touch-target text-ui transition-opacity duration-150 ease-standard disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}
