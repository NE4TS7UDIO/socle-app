"use client";

// Haut du tableau de bord (écran 02) : salutation, recherche, « Nouveau projet », bandeau « rendu prêt », Mes projets.
// Entrée en cascade (fadeUp + staggerParent : 800 ms, 80 ms entre éléments). La recherche filtre les cartes par nom ;
// la carte « Nouveau projet » reste toujours là. Sans projet (état vide), ni recherche ni tri : rien à chercher.
import { useState } from "react";
import { motion } from "motion/react";
import type { DashboardData } from "@/lib/dashboard";
import { fadeUp, staggerParent } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Greeting } from "./Greeting";
import { NewProjectCard } from "./NewProjectCard";
import { RenderReadyBanner } from "./RenderReadyBanner";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

interface DashboardMainProps {
  firstName: string;
  renderReady: DashboardData["renderReady"];
  projects: DashboardData["projects"];
}

export function DashboardMain({ firstName, renderReady, projects }: DashboardMainProps) {
  const [query, setQuery] = useState("");
  const shown = query.trim() ? projects.filter((p) => normalize(p.name).includes(normalize(query))) : projects;
  const hasProjects = projects.length > 0;

  return (
    <motion.div variants={staggerParent(0.1)} initial="hidden" animate="show" className="flex flex-col gap-16">
      <header className="flex items-end justify-between gap-6">
        <motion.div variants={fadeUp}>
          <Greeting firstName={firstName} />
        </motion.div>
        <div className="flex items-center gap-3">
          {hasProjects && (
            <label
              data-field
              className="flex items-center gap-2.5 rounded-full border border-line px-4 py-3.25 text-fg-muted transition-colors duration-150 ease-standard field-focus:border-line-strong"
            >
              <Icon name="search" size={16} />
              <input
                type="search"
                name="recherche"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un projet"
                aria-label="Rechercher un projet"
                className="w-34 bg-transparent text-ui-s text-fg placeholder:text-fg-muted"
              />
            </label>
          )}
          <Button label="Nouveau projet" href="/projets/nouveau" />
        </div>
      </header>

      {renderReady && (
        <motion.div variants={fadeUp}>
          <RenderReadyBanner notice={renderReady} />
        </motion.div>
      )}

      <section aria-labelledby="mes-projets" className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-t border-line-strong pt-5">
          <h2 id="mes-projets" className="text-label uppercase">
            Mes projets · {shown.length}
          </h2>
          {hasProjects && <p className="text-ui-s text-fg-muted">Trier : récents</p>}
        </div>
        <motion.ul variants={staggerParent(0)} className="grid grid-cols-3 gap-6">
          {shown.map((project, index) => (
            <motion.li key={project.href} variants={fadeUp} className="flex">
              <ProjectCard {...project} eager={index < 3} className="flex-1" />
            </motion.li>
          ))}
          <motion.li variants={fadeUp} className="flex">
            <NewProjectCard className="flex-1" />
          </motion.li>
        </motion.ul>
      </section>
    </motion.div>
  );
}
