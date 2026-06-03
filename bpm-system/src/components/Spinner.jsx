// Loading state used while data is being fetched.
export default function Spinner({ label = 'Загрузка...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-slate-500">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
