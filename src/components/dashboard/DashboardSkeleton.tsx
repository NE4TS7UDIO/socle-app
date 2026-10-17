// Squelette du tableau de bord pendant le chargement (handoff, écran 02 : « squelettes de cartes au chargement ») :
// mêmes blocs que la page en --bg-raised, pulsation lente arrêtée si les animations sont réduites.
const pulse = "animate-pulse bg-raised motion-reduce:animate-none";

export function DashboardSkeleton() {
  return (
    <main aria-busy="true" className="flex flex-col gap-16 px-16 pt-12 pb-24">
      <p role="status" className="sr-only">
        Chargement de tes projets…
      </p>
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className={`h-3.5 w-32 rounded-sm ${pulse}`} />
          <div className={`h-14 w-80 rounded-sm ${pulse}`} />
        </div>
        <div className="flex items-center gap-3">
          <div className={`h-11 w-46 rounded-full ${pulse}`} />
          <div className={`h-12 w-48 rounded-sm ${pulse}`} />
        </div>
      </div>
      <div className={`h-[100px] rounded-sm ${pulse}`} />
      <div className="flex flex-col gap-6">
        <div className="border-t border-line-strong pt-5">
          <div className={`h-4 w-32 rounded-sm ${pulse}`} />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[0, 1, 2].map((card) => (
            <div key={card} className="flex flex-col overflow-hidden rounded-sm border border-line">
              <div className={`h-70 ${pulse}`} />
              <div className="flex flex-col gap-2 px-5 pt-[18px] pb-5">
                <div className={`h-7 w-44 rounded-sm ${pulse}`} />
                <div className={`h-4 w-56 rounded-sm ${pulse}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
