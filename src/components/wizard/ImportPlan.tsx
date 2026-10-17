"use client";

// Écran 03 · Importer le plan (Figma 28:81). Zone de dépôt + « Prendre une photo » (appareil photo sur téléphone et
// tablette, sélecteur de fichiers ailleurs) + « Choisir un fichier ». JPG, PNG ou PDF, 25 Mo max : sinon message
// sous la zone et fichier refusé. Glisser actif : bordure pleine --border-strong. Plan illisible (retour de 04) :
// message + conseil ciblé. Un fichier valide mène à la lecture (04) du projet de démo ; il n'est pas gardé avant
// la phase 8. Entrée comme la timeline Figma : titre 0,1 s, zone 0,3 s (+32 px), conseils 0,5 s ; la pastille flotte.
import { useRef, useState, type ChangeEvent, type DragEvent, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { IconName } from "@/types/socle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { riseIn } from "@/lib/motion";

const MAX_MB = 25;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ACCEPT = ".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf";

export type ReadError = "sombre" | "biais";

const readTips: Record<ReadError, string> = {
  sombre: "La photo est trop sombre : reprends-la à la lumière du jour, sans ombre.",
  biais: "Le plan est de biais : prends-le bien droit, vu du dessus.",
};

const tips: { icon: IconName; title: string; caption: string }[] = [
  { icon: "camera", title: "Bien droit, vu du dessus", caption: "Pose le plan à plat, lumière du jour, sans ombre." },
  { icon: "ruler", title: "Des cotes lisibles", caption: "On s’en sert pour placer chaque meuble au centimètre." },
  { icon: "plan", title: "Un plan par étage", caption: "Duplex ? Ajoute le second étage juste après." },
];

/** Message d'erreur du fichier, ou null s'il est accepté. */
function checkFile(file: File): string | null {
  const knownExtension = /\.(jpe?g|png|pdf)$/i.test(file.name);
  if (!ACCEPTED_TYPES.includes(file.type) && !(file.type === "" && knownExtension)) {
    return "Ce fichier n’est pas un JPG, un PNG ou un PDF.";
  }
  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > MAX_MB) return `Ce fichier fait ${Math.ceil(sizeMb)} Mo : la limite est de ${MAX_MB} Mo.`;
  return null;
}

export function ImportPlan({ nextHref, readError }: { nextHref: string; readError?: ReadError }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [unreadable, setUnreadable] = useState<ReadError | null>(readError ?? null);

  function take(file: File | undefined) {
    if (!file) return;
    const problem = checkFile(file);
    setFileError(problem);
    setUnreadable(null);
    if (!problem) router.push(nextHref);
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    take(event.target.files?.[0]);
    event.target.value = ""; // le même fichier peut être choisi de nouveau
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(true);
  }

  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    take(event.dataTransfer.files[0]);
  }

  // Un clic dans la zone (hors boutons) ouvre aussi le sélecteur ; les boutons restent l'accès clavier.
  function onZoneClick(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target as HTMLElement).closest("button")) fileInput.current?.click();
  }

  return (
    <main className="flex flex-col items-center px-10 pt-14 pb-1">
      <div className="flex w-full max-w-220 flex-col items-center gap-10">
        <motion.div variants={riseIn(0.1)} initial="hidden" animate="show" className="flex flex-col items-center gap-4 text-center">
          <p className="text-label uppercase text-fg-brand">Étape 1 · Ton plan</p>
          <h1 className="font-serif text-serif-l">Montre-nous ton plan.</h1>
          <p className="max-w-155 text-body-l text-fg-muted">
            Une photo nette du plan de l’agence, ou le PDF. On repère les murs, les portes, les fenêtres et les cotes.
          </p>
        </motion.div>

        <motion.div variants={riseIn(0.3, 32)} initial="hidden" animate="show" className="flex w-full flex-col gap-3">
          <div
            onClick={onZoneClick}
            onDragEnter={onDragOver}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className="relative flex h-85 w-full cursor-pointer flex-col items-center justify-center gap-5 rounded-sm bg-raised"
          >
            {/* Filet 1,5 px en tirets longs comme Figma (une bordure CSS dashed les fait trop courts) ; plein au glisser. */}
            <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
              <rect
                width="100%"
                height="100%"
                rx="2"
                strokeWidth="3"
                strokeDasharray={dragging ? undefined : "8 6"}
                className="fill-none stroke-line-strong"
              />
            </svg>
            <span className="flex size-16 animate-float items-center justify-center rounded-full bg-inverse text-fg-inverse [animation-delay:600ms] motion-reduce:animate-none">
              <Icon name="upload" size={26} />
            </span>
            <p className="text-title">Glisse ton plan ici</p>
            <p className="text-caption text-fg-muted">JPG, PNG ou PDF · 25 Mo max · un plan par étage</p>
            <div className="flex gap-3 pt-2">
              <Button label="Prendre une photo" variant="outline" showArrow={false} onClick={() => cameraInput.current?.click()} />
              <Button label="Choisir un fichier" showArrow={false} onClick={() => fileInput.current?.click()} />
            </div>
            <input ref={fileInput} type="file" name="plan" accept={ACCEPT} onChange={onInput} tabIndex={-1} aria-hidden className="sr-only" />
            <input
              ref={cameraInput}
              type="file"
              name="plan-photo"
              accept="image/*"
              capture="environment"
              onChange={onInput}
              tabIndex={-1}
              aria-hidden
              className="sr-only"
            />
          </div>
          {fileError && (
            <p role="alert" className="text-ui-s text-fg-danger">
              {fileError}
            </p>
          )}
          {!fileError && unreadable && (
            <div role="alert" className="flex flex-col gap-1">
              <p className="text-ui-s text-fg-danger">On n’a pas pu lire ce plan.</p>
              <p className="text-caption text-fg-muted">{readTips[unreadable]}</p>
            </div>
          )}
        </motion.div>

        <motion.ul variants={riseIn(0.5)} initial="hidden" animate="show" className="grid w-full grid-cols-3 gap-6">
          {tips.map((tip) => (
            <li key={tip.title} className="flex flex-col gap-2.5 border-t border-line pt-5">
              <Icon name={tip.icon} size={20} />
              <p className="text-ui">{tip.title}</p>
              <p className="text-caption text-fg-muted">{tip.caption}</p>
            </li>
          ))}
        </motion.ul>

        <p className="flex items-center gap-2 text-caption text-fg-muted">
          <Icon name="lock" size={14} />
          Ton plan reste privé. On ne le partage avec personne.
        </p>
      </div>
    </main>
  );
}
