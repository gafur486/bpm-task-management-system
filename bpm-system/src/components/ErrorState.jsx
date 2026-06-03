// Shown when a query fails.
export default function ErrorState({ message = 'Что-то пошло не так', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-900/30">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-ghost">Повторить</button>}
    </div>
  )
}
