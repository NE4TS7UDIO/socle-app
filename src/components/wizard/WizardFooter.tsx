// Pied de l'assistant (écrans 05 et 06, Figma 29:901) : retour, résumé, action principale. Fixé en bas de l'écran ;
// la page réserve 72 px dessous (pb-18).
import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function WizardFooter({
  backHref,
  backLabel,
  summary,
  children,
}: {
  backHref: string;
  backLabel: string;
  summary: ReactNode;
  children: ReactNode;
}) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 flex h-18 items-center justify-between gap-6 border-t border-line bg-ground px-10">
      <Link
        href={backHref}
        className="flex items-center gap-2 text-ui-s text-fg-muted transition-colors duration-150 ease-standard hovered:text-fg"
      >
        <Icon name="chevron-left" size={16} />
        {backLabel}
      </Link>
      <p className="text-caption text-fg-muted">{summary}</p>
      {children}
    </footer>
  );
}
