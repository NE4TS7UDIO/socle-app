"use client";

// Écran 01 · Bienvenue (Figma 27:7), panneau gauche de 640 : logo, « Pour qui est ce projet ? », Continuer.
// « Pour moi » est pré-coché. Entrée en cascade comme la timeline Figma (fadeUp + staggerParent).
// Le choix (profil.usage) sera enregistré en phase 8 ; Continuer mène au tableau de bord.
import { useState } from "react";
import { motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerParent } from "@/lib/motion";

const usages = [
  { value: "moi", title: "Pour moi", caption: "Mon prochain chez-moi, ou celui que j’habite déjà." },
  { value: "vente-location", title: "Pour vendre ou louer", caption: "Home staging virtuel pour une annonce." },
  { value: "client", title: "Pour un client", caption: "Agents, décorateurs, architectes." },
] as const;

type Usage = (typeof usages)[number]["value"];

export function WelcomePanel({ firstName }: { firstName: string }) {
  const [usage, setUsage] = useState<Usage>("moi");

  return (
    <div className="flex min-h-screen flex-col justify-between gap-12 px-20 py-14">
      <div className="flex items-center justify-between">
        <Logo className="h-12 w-auto" />
        <p className="text-label-s uppercase text-fg-muted">Étape 1 sur 2</p>
      </div>

      <motion.div variants={staggerParent(0.1)} initial="hidden" animate="show" className="flex flex-col gap-7">
        <motion.p variants={fadeUp} className="text-label uppercase text-fg-brand">
          Bienvenue sur Socle
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-serif text-[76px] leading-[0.95] tracking-[-0.02em]">
          Bonjour {firstName}.
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-110 text-body-l text-fg-muted">
          Deux questions, et on s’occupe du reste. Pour qui est ce projet ?
        </motion.p>
        <fieldset className="flex flex-col gap-2.5">
          <legend className="sr-only">Pour qui est ce projet ?</legend>
          {usages.map((option) => {
            const checked = usage === option.value;
            return (
              <motion.label
                key={option.value}
                variants={fadeUp}
                className={`flex cursor-pointer items-center gap-4 rounded-sm border-[1.5px] px-5 py-4 transition-colors duration-150 ease-standard has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg-brand ${
                  checked ? "border-line-strong bg-raised" : "border-line bg-ground hovered:border-line-strong"
                }`}
              >
                <input
                  type="radio"
                  name="usage"
                  value={option.value}
                  checked={checked}
                  onChange={() => setUsage(option.value)}
                  className="sr-only"
                />
                <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-strong">
                  {checked && <span className="size-2.5 rounded-full bg-inverse" />}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-ui">{option.title}</span>
                  <span className="text-caption text-fg-muted">{option.caption}</span>
                </span>
              </motion.label>
            );
          })}
        </fieldset>
      </motion.div>

      <div className="flex items-center justify-between gap-6">
        <p className="text-caption text-fg-muted">Tu pourras changer ça plus tard.</p>
        <Button label="Continuer" href="/projets" />
      </div>
    </div>
  );
}
