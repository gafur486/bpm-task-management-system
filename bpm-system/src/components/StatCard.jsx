// Dashboard statistic card.
export default function StatCard({ label, value, accent = 'brand', icon }) {
  const accents = {
    brand: 'text-brand-500 bg-brand-50 dark:bg-brand-900/30',
    gold: 'text-gold-500 bg-amber-50 dark:bg-amber-900/20',
    emerald: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  }
  return (
    <div className="card flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accents[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
}
