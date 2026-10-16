// Page de départ : vérifie que polices, tokens et thèmes fonctionnent.
// Elle sera remplacée par /bienvenue et /projets (voir docs/plan-de-build.md, phase 1).
import { Logo } from "@/components/brand/Logo";

const swatches = [
  ["bg-ground", "ground"],
  ["bg-raised", "raised"],
  ["bg-inverse", "inverse"],
  ["bg-brand", "brand"],
  ["bg-stone", "stone"],
] as const;

function Panel({ theme }: { theme: "day" | "night" }) {
  return (
    <section data-theme={theme} className="flex flex-1 flex-col gap-12 bg-ground p-16 text-fg">
      <div className="flex items-center justify-between">
        <Logo className="h-12 w-auto" />
        <span className="text-label-s uppercase text-fg-muted">Thème {theme === "day" ? "Jour" : "Nuit"}</span>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-label uppercase text-fg-brand">Base de l’app prête</p>
        <h1 className="font-serif text-serif-l">
          Votre intérieur, <em className="italic">comme dans un magazine.</em>
        </h1>
        <p className="max-w-[44ch] text-body-l text-fg-muted">
          Polices, couleurs Jour/Nuit, typographie et motion sont branchées sur les tokens Figma.
        </p>
      </div>
      <div className="flex gap-3">
        {swatches.map(([cls, name]) => (
          <div key={name} className="flex flex-col gap-2">
            <div className={`${cls} size-16 rounded-sm border border-line`} />
            <span className="text-caption text-fg-muted">{name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="h-12 bg-inverse px-6 text-label uppercase text-fg-inverse transition-colors duration-150 ease-standard hover:bg-brand">
          Rejoindre la liste →
        </button>
        <button className="h-12 border border-line-strong px-6 text-label uppercase transition-colors duration-150 ease-standard hover:bg-raised">
          Voir un exemple
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col wide:flex-row">
      <Panel theme="day" />
      <Panel theme="night" />
    </main>
  );
}
