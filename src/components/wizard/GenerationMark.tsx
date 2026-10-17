// Logo animé de l'écran 07 (Figma 32:256, handoff « Attente ») : le dôme se lève derrière un masque, le socle
// s'élargit, en boucle (3 s, keyframes dome/plinth). Deux fois le même logo (variant « mark », 160 px = échelle 2,5),
// découpé : le dôme d'un côté, le socle de l'autre — pas de tracé recopié. Animations réduites : logo fixe.
import { Logo } from "@/components/brand/Logo";

export function GenerationMark() {
  return (
    <div aria-hidden className="relative h-[105px] w-30">
      {/* Dôme + pied (y 14 → 48 du repère 64) : -35 px pour caler le haut du dôme, masque de 85 px. */}
      <div className="absolute inset-x-0 top-0 h-[85px] overflow-hidden">
        <Logo
          variant="mark"
          title=""
          className="absolute -top-[35px] -left-5 size-40 animate-dome [clip-path:inset(0_0_25%_0)] motion-reduce:animate-none"
        />
      </div>
      {/* Socle (y 48 → 56) : s'élargit depuis son centre (centre du logo). */}
      <Logo
        variant="mark"
        title=""
        className="absolute -top-[35px] -left-5 size-40 animate-plinth [clip-path:inset(75%_0_12.5%_0)] motion-reduce:animate-none"
      />
    </div>
  );
}
