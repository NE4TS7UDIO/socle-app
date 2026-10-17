// Bandeau « rendu prêt » (écran 02, Figma 27:149) : fond --bg-brand, vignette 120 × 76, lien « Voir le rendu → ».
// Le contour de focus global est noyer, comme le fond : ici il passe en avoine (--text-brand redéfini localement).
import Image from "next/image";
import Link from "next/link";
import type { DashboardData } from "@/lib/dashboard";

export function RenderReadyBanner({ notice }: { notice: NonNullable<DashboardData["renderReady"]> }) {
  return (
    <div className="flex items-center gap-6 rounded-sm bg-brand py-3 pr-7 pl-3 text-fg-inverse [--text-brand:var(--text-on-inverse)]">
      <Image
        src={notice.imageUrl}
        alt=""
        width={120}
        height={76}
        loading="eager"
        className="h-[76px] w-30 shrink-0 rounded-sm object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-label-s uppercase opacity-72">Nouveau</p>
        <p className="truncate text-title">{notice.title}</p>
        <p className="text-caption opacity-72">
          {notice.projectName} · {notice.age}
        </p>
      </div>
      <Link href={notice.href} className="group flex shrink-0 items-center gap-2 py-2 text-label uppercase">
        Voir le rendu
        <span aria-hidden className="transition-transform duration-150 ease-standard group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
