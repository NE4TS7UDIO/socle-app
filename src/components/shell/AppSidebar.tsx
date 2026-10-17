// Barre latérale de l'app (écrans 02 et 12, Figma 27:239) : 264 px, figée pendant que le contenu défile.
// Logo, 4 entrées, carte formule, utilisateur.
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { studioHref } from "@/lib/dashboard";
import { SidebarNav, type SidebarLink } from "./SidebarNav";

interface AppSidebarProps {
  projectId: string; // projet en cours : cible de « Rendus » et « Liste d'achats »
  plan: { name: string; description: string; progress: number };
  user: { firstName: string; city: string };
}

export function AppSidebar({ projectId, plan, user }: AppSidebarProps) {
  const links: SidebarLink[] = [
    { label: "Projets", icon: "home", href: "/projets", match: "/projets" },
    { label: "Inspirations", icon: "sparkle", href: "/projets#inspirations" },
    { label: "Rendus", icon: "image", href: `${studioHref(projectId)}?vue=rendus` },
    { label: "Liste d’achats", icon: "bag", href: `/projets/${projectId}/achats`, match: `/projets/${projectId}/achats` },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-66 flex-col gap-1 overflow-y-auto border-r border-line bg-ground px-4 pt-7 pb-6">
      <Link href="/projets" aria-label="Socle, mes projets" className="mb-7 ml-3.5 self-start">
        <Logo className="h-12 w-auto" />
      </Link>
      <SidebarNav links={links} />
      <div className="mt-auto flex flex-col gap-2.5 rounded-sm bg-raised p-4">
        <p className="text-label-s uppercase text-fg-brand">{plan.name}</p>
        <p className="max-w-[200px] text-caption text-fg-muted">{plan.description}</p>
        <ProgressBar value={plan.progress} label={plan.name} />
      </div>
      <div className="flex items-center gap-3 pt-4 pl-2">
        <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-ui text-fg-inverse">
          {user.firstName.charAt(0)}
        </span>
        <div className="flex flex-col">
          <p className="text-ui">{user.firstName}</p>
          <p className="text-caption text-fg-muted">{user.city}</p>
        </div>
      </div>
    </aside>
  );
}
