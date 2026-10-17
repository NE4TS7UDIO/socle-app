// /bienvenue — écran 01 · Bienvenue, plein écran : panneau de 640 + visuel en parallaxe.
import type { Metadata } from "next";
import { WelcomePanel } from "@/components/welcome/WelcomePanel";
import { WelcomeVisual } from "@/components/welcome/WelcomeVisual";
import { getShell } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Bienvenue" };

export default function WelcomePage() {
  const { user } = getShell();
  return (
    <main className="grid min-h-screen grid-cols-1 desktop:grid-cols-[640px_1fr]">
      <WelcomePanel firstName={user.firstName} />
      <WelcomeVisual />
    </main>
  );
}
