// Coquille « App avec barre latérale » (écrans 02 et 12) : barre de 264 px figée, le contenu défile à droite.
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { getShell } from "@/lib/dashboard";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, plan, currentProjectId } = getShell();
  return (
    <>
      <AppSidebar projectId={currentProjectId} plan={plan} user={user} />
      <div className="pl-66">{children}</div>
    </>
  );
}
