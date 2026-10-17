// Barre de l'assistant (écrans 03 → 06, Figma 28:82) : logo, étapes 1 · 2 · 3, « Enregistrer et quitter ».
// Étape faite : pastille noyer cochée ; en cours : pastille encre (aria-current="step") ; à venir : cercle --border-strong.
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { assistantSteps } from "@/lib/assistant";

export function WizardBar({ step }: { step: 1 | 2 | 3 }) {
  return (
    <header className="sticky top-0 z-20 flex h-18 shrink-0 items-center justify-between border-b border-line bg-ground px-10">
      <Logo className="h-12 w-auto" />
      <ol aria-label="Étapes" className="flex items-center gap-3">
        {assistantSteps.map((label, index) => {
          const number = index + 1;
          const done = number < step;
          const current = number === step;
          return (
            <li key={label} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden className="h-px w-12 bg-line-strong" />}
              <span aria-current={current ? "step" : undefined} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`flex size-6 items-center justify-center rounded-full text-caption ${
                    done ? "bg-brand text-fg-inverse" : current ? "bg-inverse text-fg-inverse" : "border border-line-strong text-fg-muted"
                  }`}
                >
                  {done ? <Icon name="check" size={12} /> : number}
                </span>
                <span className={`text-ui-s ${done || current ? "text-fg" : "text-fg-muted"}`}>{label}</span>
                {done && <span className="sr-only">(faite)</span>}
              </span>
            </li>
          );
        })}
      </ol>
      <Link
        href="/projets"
        className="flex items-center gap-2 text-ui-s text-fg-muted transition-colors duration-150 ease-standard hovered:text-fg"
      >
        Enregistrer et quitter
        <Icon name="close" size={16} />
      </Link>
    </header>
  );
}
