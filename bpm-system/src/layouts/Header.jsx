import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { initials } from '@/utils/formatters'

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
      </button>
      <div className="hidden lg:block">
        <h1 className="font-display text-xl font-semibold text-slate-800 dark:text-slate-100">Рабочее пространство</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" title="Сменить тему">
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
          )}
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white">{initials(user?.name)}</div>
          <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-red-500 dark:text-slate-300">Выйти</button>
        </div>
      </div>
    </header>
  )
}
