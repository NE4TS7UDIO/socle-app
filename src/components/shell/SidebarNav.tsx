"use client";

// Entrées de la barre latérale : l'entrée active suit l'URL (aria-current="page" via NavItem).
import { usePathname } from "next/navigation";
import type { IconName } from "@/types/socle";
import { NavItem } from "@/components/ui/NavItem";

export interface SidebarLink {
  label: string;
  icon: IconName;
  href: string;
  match?: string; // chemin qui rend l'entrée active ; absent = jamais active (ancre, autre coquille)
}

export function SidebarNav({ links }: { links: SidebarLink[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation principale">
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.label}>
            <NavItem label={link.label} icon={link.icon} href={link.href} active={pathname === link.match} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
