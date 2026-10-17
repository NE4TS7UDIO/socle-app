"use client";

// /dev/kit — chaque composant de src/components/ui dans chaque état, une colonne par thème (Jour, Nuit).
// Survol, appuyé et focus sont forcés avec data-state ; tout le reste se teste à la souris et au clavier.
// Textes repris des écrans (02, 09, 10b, 11, 12) ; le message d'erreur du champ est un exemple du kit.
import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import type { IconName, Theme } from "@/types/socle";
import { ambiances, formatEUR } from "@/lib/ambiances";
import { AmbianceCard } from "@/components/ui/AmbianceCard";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ICONS, Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { NavItem } from "@/components/ui/NavItem";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Segmented } from "@/components/ui/Segmented";
import { Stat } from "@/components/ui/Stat";
import { Switch } from "@/components/ui/Switch";
import { Tag } from "@/components/ui/Tag";

type ButtonSample = {
  state: string;
  loading?: boolean;
  disabled?: boolean;
  "data-state"?: "hover" | "pressed";
};

const buttonSamples: ButtonSample[] = [
  { state: "Défaut" },
  { state: "Survol", "data-state": "hover" },
  { state: "Appuyé", "data-state": "pressed" },
  { state: "Chargement", loading: true },
  { state: "Désactivé", disabled: true },
];

const filters = ["Même taille", "Bouclé", "< 2 500 €", "Modulable"];

const unlockFeatures = [
  "Rendus HD 4K illimités, matin et soir",
  "Plan coté PDF, prêt pour l’artisan",
  "Lien 3D à partager (Rania peut commenter)",
  "Liste d’achats avec liens marchands",
  "Modifications illimitées pendant 12 mois",
];

const iconNames = Object.keys(ICONS) as IconName[];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-t border-line pt-6">
      <h3 className="text-label uppercase text-fg-muted">{title}</h3>
      {children}
    </section>
  );
}

function Sample({ state, children }: { state: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <span className="text-caption text-fg-muted">{state}</span>
    </div>
  );
}

function KitColumn({ theme }: { theme: Theme }) {
  const id = useId();
  const [light, setLight] = useState<"matin" | "soir">("matin");
  const [view, setView] = useState<"3d" | "plan" | "rendus">("3d");
  const [lightIcons, setLightIcons] = useState<"matin" | "soir">("soir");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Même taille", "Bouclé"]);
  const [email, setEmail] = useState("");
  const [settings, setSettings] = useState({ prices: true, comments: true, password: false });
  const [shareSettings, setShareSettings] = useState({ prices: true, comments: true, password: false });
  const [replay, setReplay] = useState(0);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState<null | "unlock" | "share">(null);

  function toggleFilter(label: string, selected: boolean) {
    setSelectedFilters((current) => (selected ? [...current, label] : current.filter((f) => f !== label)));
  }

  function save() {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 1600);
  }

  const switchRows = [
    { key: "prices", label: "Afficher les prix" },
    { key: "comments", label: "Autoriser les commentaires" },
    { key: "password", label: "Protéger par mot de passe" },
  ] as const;

  return (
    <div data-theme={theme} className="flex min-w-0 flex-col gap-10 bg-ground px-10 py-12 text-fg">
      <header className="flex flex-col gap-2">
        <p className="text-label uppercase text-fg-brand">Kit UI · src/components/ui</p>
        <h2 className="font-serif text-serif-m">Thème {theme === "day" ? "Jour" : "Nuit"}</h2>
      </header>

      <Section title="Button">
        {(["primary", "outline", "link"] as const).map((variant) => (
          <div key={variant} className="flex flex-wrap gap-6">
            {buttonSamples.map(({ state, ...sample }) => (
              <Sample key={state} state={`${variant} · ${state}`}>
                <Button label="Je veux un accès" variant={variant} {...sample} />
              </Sample>
            ))}
          </div>
        ))}
        <Sample state="Clic = chargement 1,6 s">
          <Button label="Continuer" loading={saving} onClick={save} />
        </Sample>
      </Section>

      <Section title="Segmented">
        <div className="flex flex-wrap items-start gap-8">
          <Sample state="2 options">
            <Segmented
              ariaLabel="Lumière"
              value={light}
              onChange={setLight}
              options={[
                { value: "matin", label: "Matin" },
                { value: "soir", label: "Soir" },
              ]}
            />
          </Sample>
          <Sample state="3 options">
            <Segmented
              ariaLabel="Vue"
              value={view}
              onChange={setView}
              options={[
                { value: "3d", label: "3D" },
                { value: "plan", label: "Plan" },
                { value: "rendus", label: "Rendus" },
              ]}
            />
          </Sample>
          <Sample state="Avec icônes">
            <Segmented
              ariaLabel="Lumière avec icônes"
              value={lightIcons}
              onChange={setLightIcons}
              options={[
                { value: "matin", label: "Matin", icon: "sun" },
                { value: "soir", label: "Soir", icon: "moon" },
              ]}
            />
          </Sample>
        </div>
      </Section>

      <Section title="Nav item">
        <div className="flex flex-col gap-1">
          <Sample state="Actif (aria-current)">
            <NavItem label="Projets" icon="home" href="/dev/kit" active />
          </Sample>
          <Sample state="Défaut">
            <NavItem label="Inspirations" icon="sparkle" href="/dev/kit" />
          </Sample>
          <Sample state="Survol">
            <NavItem label="Rendus" icon="image" href="/dev/kit" data-state="hover" />
          </Sample>
          <Sample state="Avec badge">
            <NavItem label="Liste d’achats" icon="bag" href="/dev/kit" badge={2} />
          </Sample>
        </div>
      </Section>

      <Section title="Chip">
        <div className="flex flex-wrap gap-6">
          <Sample state="Défaut">
            <Chip label="Belgian Modern" />
          </Sample>
          <Sample state="Survol">
            <Chip label="Belgian Modern" data-state="hover" />
          </Sample>
          <Sample state="Sélectionné">
            <Chip label="Belgian Modern" selected />
          </Sample>
        </div>
        <Sample state="Filtres (écran 09) — clic = bascule">
          <div className="flex max-w-80 flex-wrap gap-2">
            {filters.map((label) => (
              <Chip
                key={label}
                label={label}
                selected={selectedFilters.includes(label)}
                onToggle={(selected) => toggleFilter(label, selected)}
              />
            ))}
          </div>
        </Sample>
      </Section>

      <Section title="Input">
        <div className="flex flex-col gap-6">
          <Sample state="Vide, puis saisie">
            <Input type="email" placeholder="ton@email.com" label="Adresse e-mail" value={email} onChange={setEmail} />
          </Sample>
          <Sample state="Focus">
            <Input placeholder="ton@email.com" label="Adresse e-mail (focus)" data-state="focus" />
          </Sample>
          <Sample state="Erreur">
            <Input
              placeholder="ton@email.com"
              label="Adresse e-mail (erreur)"
              value="ton@email"
              error="Vérifie l’adresse e-mail."
            />
          </Sample>
          <Sample state="Avec icône, lecture seule (écran 11)">
            <Input placeholder="Lien" label="Lien de partage" icon="link" value="socle.app/p/appartement-2-3" readOnly />
          </Sample>
        </div>
      </Section>

      <Section title="Stat">
        <div className="grid grid-cols-1 wide:grid-cols-2">
          <Stat value="4" caption="styles pensés pour aller ensemble, pièce par pièce." />
          <Stat value={formatEUR(6840)} caption={`sur ${formatEUR(8000)} prévus`} />
        </div>
      </Section>

      <Section title="Switch">
        <div className="flex max-w-120 flex-col">
          {switchRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between py-2.5">
              <label htmlFor={`${id}-${row.key}`} className="text-body-s">
                {row.label}
              </label>
              <Switch
                id={`${id}-${row.key}`}
                label={row.label}
                checked={settings[row.key]}
                onChange={(checked) => setSettings((current) => ({ ...current, [row.key]: checked }))}
              />
            </div>
          ))}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-body-s text-fg-muted">Désactivé</span>
            <Switch label="Désactivé" checked={false} disabled onChange={() => {}} />
          </div>
        </div>
      </Section>

      <Section title="Tag sur photo">
        <div className="relative h-72 overflow-hidden rounded-sm bg-stone">
          <Image src="/images/ambiance-warm-minimal.jpg" alt="" fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 flex flex-col items-start justify-between p-6">
            <div className="flex flex-col items-start gap-3">
              <Tag label="Séjour · 48 m²" icon="plan" />
              <Tag label="Lumière du soir · ouest" icon="sun" />
              <Tag label="Bouclé avoine" icon="layers" />
            </div>
            <Tag label="Séjour · lumière du matin" variant="solid" />
          </div>
        </div>
        <p className="text-caption text-fg-muted">Toujours en pilule Nuit, quel que soit le thème autour (outline = écran 01, solid = écran 10).</p>
      </Section>

      <Section title="Ambiance card (toujours Nuit)">
        <div className="flex flex-wrap gap-6">
          {(["Default", "Hover", "Selected"] as const).map((state) => (
            <Sample key={state} state={state}>
              <AmbianceCard
                {...ambiances[0]}
                selected={state === "Selected"}
                data-state={state === "Hover" ? "hover" : undefined}
                onSelect={() => {}}
                onPreview={() => {}}
                tabIndex={-1}
              />
            </Sample>
          ))}
        </div>
      </Section>

      <Section title="Progress bar">
        <div key={replay} className="flex max-w-120 flex-col gap-6">
          <Sample state="2 px · 30 %">
            <div className="w-80">
              <ProgressBar value={0.3} height={2} label="Lecture du plan" />
            </div>
          </Sample>
          <Sample state="4 px · 60 % (formule, écran 02)">
            <div className="w-80">
              <ProgressBar value={0.6} label="Formule Découverte" />
            </div>
          </Sample>
          <Sample state="4 px · encre · 68 % (attente, écran 04)">
            <div className="w-80">
              <ProgressBar value={0.68} label="Analyse du plan" fill="primary" />
            </div>
          </Sample>
          <Sample state={`6 px · budget ${formatEUR(6840)} sur ${formatEUR(8000)} (écran 12)`}>
            <div className="w-80">
              <ProgressBar value={6840 / 8000} height={6} label="Budget utilisé" />
            </div>
          </Sample>
        </div>
        <Button label="Rejouer" variant="link" showArrow={false} onClick={() => setReplay((n) => n + 1)} />
      </Section>

      <Section title="Modal (toujours Jour)">
        <div className="flex flex-wrap gap-4">
          <Button label="10b · Débloquer (520)" variant="outline" showArrow={false} onClick={() => setOpenModal("unlock")} />
          <Button label="11 · Partager (560)" variant="outline" showArrow={false} onClick={() => setOpenModal("share")} />
        </div>
        <p className="text-caption text-fg-muted">Échap, clic sur le voile ou × ferment ; Tab reste dans la fenêtre ; le focus revient au bouton.</p>

        <Modal open={openModal === "unlock"} onClose={() => setOpenModal(null)} eyebrow="Appartement 2.3" title="Débloque ton projet." width={520}>
          <div className="flex items-baseline gap-3">
            <p className="font-serif text-serif-l">39 €</p>
            <p className="text-body-s text-fg-muted">une fois · pas d’abonnement</p>
          </div>
          <ul className="flex flex-col">
            {unlockFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 border-b border-line py-[11px] text-body-s">
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-fg-inverse">
                  <Icon name="check" size={14} className="size-2.5" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5">
            <Button label="Payer 39 € par carte" fullWidth />
            <Button label="Bancontact" variant="outline" showArrow={false} fullWidth />
          </div>
          <p className="text-center text-caption text-fg-muted">Satisfait ou remboursé pendant 14 jours. Paiement sécurisé.</p>
        </Modal>

        <Modal open={openModal === "share"} onClose={() => setOpenModal(null)} eyebrow="Appartement 2.3" title="Partager le projet">
          <div className="flex items-center gap-2">
            <Input placeholder="Lien" label="Lien de partage" icon="link" value="socle.app/p/appartement-2-3" readOnly className="max-w-none flex-1" />
            <Button label="Copier" showArrow={false} />
          </div>
          <div className="flex flex-col">
            {switchRows.map((row) => (
              <div key={row.key} className="flex items-center justify-between py-2.5">
                <label htmlFor={`${id}-share-${row.key}`} className="text-body-s">
                  {row.label}
                </label>
                <Switch
                  id={`${id}-share-${row.key}`}
                  label={row.label}
                  checked={shareSettings[row.key]}
                  onChange={(checked) => setShareSettings((current) => ({ ...current, [row.key]: checked }))}
                />
              </div>
            ))}
          </div>
        </Modal>
      </Section>

      <Section title={`Icon · ${iconNames.length} icônes, trait 1,5`}>
        <ul className="grid grid-cols-4 gap-x-4 gap-y-6 tablet:grid-cols-6">
          {iconNames.map((name) => (
            <li key={name} className="flex flex-col items-start gap-2">
              <Icon name={name} />
              <span className="text-caption text-fg-muted">{name}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-end gap-6">
          {([14, 16, 18, 20, 24] as const).map((size) => (
            <Sample key={size} state={`${size} px`}>
              <Icon name="plan" size={size} />
            </Sample>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function KitBoard() {
  return (
    <main className="grid min-h-screen grid-cols-1 desktop:grid-cols-2">
      <h1 className="sr-only">Kit UI Socle</h1>
      <KitColumn theme="day" />
      <KitColumn theme="night" />
    </main>
  );
}
