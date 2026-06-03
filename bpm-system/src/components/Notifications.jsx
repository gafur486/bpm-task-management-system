import { useNotificationStore } from '@/store/notificationStore'

// Renders toast notifications in the corner of the screen.
export default function Notifications() {
  const { notifications, removeNotification } = useNotificationStore()
  const colors = {
    success: 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    error: 'border-red-300 bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-200',
    info: 'border-slate-300 bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100',
  }
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {notifications.map((n) => (
        <div key={n.id} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${colors[n.type]}`}>
          <span>{n.message}</span>
          <button onClick={() => removeNotification(n.id)} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  )
}
