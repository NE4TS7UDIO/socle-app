// Fenêtres (Modal 10b/11, aperçu d'ambiance 06) : rendu côté client seulement, focus placé dans la fenêtre
// et piégé (Tab), Échap ferme, défilement de la page bloqué, focus rendu à l'élément qui a ouvert.
import { useEffect, useSyncExternalStore, type KeyboardEvent, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Le portail a besoin de document : rien côté serveur, la fenêtre apparaît après l'hydratation.
const subscribe = () => () => {};
export const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export function useDialog(open: boolean, panel: RefObject<HTMLElement | null>, onClose: () => void) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open || !isClient) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // Défilement bloqué ; la gouttière de la barre reste réservée pour que la page derrière ne bouge pas.
    const root = document.documentElement;
    const { overflow, scrollbarGutter } = root.style;
    root.style.overflow = "hidden";
    root.style.scrollbarGutter = "stable";
    panel.current?.focus();
    return () => {
      root.style.overflow = overflow;
      root.style.scrollbarGutter = scrollbarGutter;
      opener?.focus();
    };
  }, [open, isClient, panel]);

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panel.current) return;
    const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;
    if (event.shiftKey && (current === first || current === panel.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return { isClient, onKeyDown };
}
