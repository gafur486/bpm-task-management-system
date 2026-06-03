import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const links = [
  { to: '/dashboard', label: 'Дашборд', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
  { to: '/tasks', label: 'Задачи', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { to: '/employees', label: 'Сотрудники', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 0M23 21v-2a4 4 0 0 0-3-3.87' },
  { to: '/workflow', label: 'Заявки (BPM)', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6' },
]

export default function Sidebar({ open, onClose }) {
  const user = useAuthStore((s) => s.user)
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">B</div>
          <div>
            <p className="font-display text-lg font-bold leading-none text-slate-800 dark:text-slate-100">BPM System</p>
            <p className="text-[11px] text-slate-400">Internal Banking</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={l.icon} />
              </svg>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="text-xs text-slate-400">Вы вошли как</p>
          <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">{user?.name}</p>
          <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800">{user?.role}</span>
        </div>
      </aside>
    </>
  )
}
