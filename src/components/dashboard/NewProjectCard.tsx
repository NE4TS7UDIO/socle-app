// Carte « Nouveau projet » (écran 02, Figma 27:192) : cadre pointillé --border-strong, pastille + de 56 px.
// Seule carte de la grille quand il n'y a encore aucun projet.
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function NewProjectCard({ className }: { className?: string }) {
  return (
    <Link
      href="/projets/nouveau"
      className={`flex min-h-93 flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-line-strong p-6 text-center transition-colors duration-250 ease-standard hovered:bg-raised ${className ?? ""}`}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-inverse text-fg-inverse">
        <Icon name="plus" size={22} />
      </span>
      <span className="text-title">Nouveau projet</span>
      <span className="text-caption text-fg-muted">Une photo du plan suffit.</span>
    </Link>
  );
}
