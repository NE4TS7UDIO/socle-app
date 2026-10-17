"use client";

// Modal — écrans 10b (Figma 35:1078, 520 px) et 11 (Figma 36:1235, 560 px). Toujours en thème Jour, même sur le Studio Nuit.
// Voile --scrim 300 ms ; fenêtre +40 px et 0,97 → 1 en 700 ms ; fermeture 250 ms (presets scrim + modal).
// role="dialog" aria-modal : focus placé dans la fenêtre, Tab piégé, Échap ou clic sur le voile ferment,
// le focus revient à l'élément qui a ouvert la fenêtre (useDialog).
import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { ModalProps } from "@/types/socle";
import { useDialog } from "@/lib/dialog";
import { modal, scrim } from "@/lib/motion";
import { Icon } from "./Icon";

const layout = {
  520: "max-w-[520px] px-10 pt-9 pb-8",
  560: "max-w-[560px] px-9 py-8",
} as const;

export function Modal({ open, onClose, eyebrow, title, width = 560, children }: ModalProps) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const { isClient, onKeyDown } = useDialog(open, panel, onClose);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div key="modal" className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            aria-hidden
            className="fixed inset-0 bg-scrim"
            variants={scrim}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
          />
          <div className="pointer-events-none relative flex min-h-full items-center justify-center p-4">
            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              data-theme="day"
              onKeyDown={onKeyDown}
              variants={modal}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`pointer-events-auto flex w-full flex-col gap-6 rounded-sm bg-ground text-fg ${layout[width]}`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-2">
                  {eyebrow && <p className="text-label-s uppercase text-fg-brand">{eyebrow}</p>}
                  <h2 id={titleId} className="font-serif text-serif-m">
                    {title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className="touch-target shrink-0 text-fg transition-colors duration-150 ease-standard hovered:text-fg-muted"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
