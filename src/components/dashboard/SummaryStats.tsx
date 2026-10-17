// Résumé du projet (écran 02, Figma 27:229) : trois chiffres sous un filet --border-strong, chiffres tabulaires,
// valeurs déjà formatées fr-BE (formatEUR).
export function SummaryStats({ stats }: { stats: { value: string; caption: string }[] }) {
  return (
    <dl className="grid grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.caption} className="flex flex-col-reverse gap-2 border-t border-line-strong pt-5">
          <dt className="text-body-s text-fg-muted">{stat.caption}</dt>
          <dd className="text-stat-s tabular-nums">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
