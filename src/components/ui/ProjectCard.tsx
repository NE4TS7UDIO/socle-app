// Project card — Figma « App/Project card » (24:127) : image 280 de haut, statut en pilule Nuit, toute la carte est le lien.
// Survol (ou focus clavier) : image × 1,06 en 450 ms, filet --border-strong, « Ouvrir → » apparaît.
// Nom trop long : une ligne coupée avec …, nom complet en infobulle (handoff « Cas limites »).
// Nom accessible : nom, détails puis statut (sinon la pilule de statut, première dans le DOM, serait lue en tête).
import Image from "next/image";
import Link from "next/link";
import type { ProjectCardProps } from "@/types/socle";
import { Icon } from "./Icon";

export function ProjectCard({
  name,
  meta,
  status,
  imageUrl,
  href,
  eager = false,
  className,
}: ProjectCardProps & { eager?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      aria-label={`${name}, ${meta}, ${status}`}
      className={`group flex min-w-0 flex-col overflow-hidden rounded-sm border border-line bg-raised transition-colors duration-450 ease-out-expo hovered:border-line-strong focus-visible:border-line-strong ${className ?? ""}`}
    >
      <div className="relative h-70 overflow-hidden">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(min-width: 1280px) 340px, 50vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-450 ease-out-expo group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
        />
        <span
          data-theme="night"
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ground px-3 py-1.5 text-label-s uppercase text-fg"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-fg-success" />
          {status}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 px-5 pt-4.5 pb-5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="truncate text-title" title={name}>
            {name}
          </p>
          <p className="truncate text-caption text-fg-muted">{meta}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-ui-s text-fg-muted opacity-0 transition-opacity duration-250 ease-standard group-hover:opacity-100 group-focus-visible:opacity-100">
          Ouvrir
          <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </Link>
  );
}
