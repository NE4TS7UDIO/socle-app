"use client";

// Aperçu d'une ambiance (« Aperçu → » sur les cartes de l'écran 06). Non dessiné dans Figma (décision du
// 17/10/2026) : la photo en grand, thème Nuit, avec nom, matières et palette. Voile + montée du preset modal ;
// Échap, clic sur le voile ou « Fermer » referment ; focus piégé puis rendu à la carte (useDialog).
import Image from "next/image";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { ambiances } from "@/lib/ambiances";
import { Icon } from "@/components/ui/Icon";
import { useDialog } from "@/lib/dialog";
import { modal, scrim } from "@/lib/motion";

type Ambiance = (typeof ambiances)[number];

export function AmbiancePreview({ ambiance, onClose }: { ambiance: Ambiance | null; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const { isClient, onKeyDown } = useDialog(ambiance !== null, panel, onClose);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {ambiance && (
        <div key="apercu" className="fixed inset-0 z-50">
          <motion.div
            aria-hidden
            className="fixed inset-0 bg-scrim"
            variants={scrim}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
          />
          <div className="pointer-events-none relative flex h-full items-center justify-center p-10">
            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-label={`Aperçu de l’ambiance ${ambiance.name}`}
              tabIndex={-1}
              data-theme="night"
              onKeyDown={onKeyDown}
              variants={modal}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-auto relative flex w-full max-w-250 flex-col gap-5 rounded-sm bg-ground p-5 text-fg"
            >
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm">
                <Image src={ambiance.imageUrl} alt={`Ambiance ${ambiance.name}`} fill sizes="960px" className="object-cover" />
              </div>
              <div className="flex items-end justify-between gap-6 px-1 pb-1">
                <div className="flex flex-col gap-2">
                  <h2 className="font-serif text-serif-i-m italic">{ambiance.name}</h2>
                  <p className="text-label-s uppercase text-fg-muted">{ambiance.materials}</p>
                </div>
                <div className="flex gap-2">
                  {ambiance.palette.map((color, i) => (
                    // Couleurs de la palette = données de l'ambiance, pas des couleurs d'interface.
                    <span key={`${color}-${i}`} aria-hidden className="size-6 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="touch-target absolute top-8 right-8 flex size-9 items-center justify-center rounded-full bg-ground text-fg transition-colors duration-150 ease-standard hovered:bg-raised"
              >
                <Icon name="close" size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
