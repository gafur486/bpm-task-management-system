import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { useNotificationStore } from '@/store/notificationStore'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@bank.tj')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const notify = useNotificationStore((s) => s.addNotification)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { token, user } = await authService.login({ email, password })
      setAuth({ token, user })
      notify(`Добро пожаловать, ${user.name}`, 'success')
      navigate(from, { replace: true })
    } catch (err) {
      notify(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center text-white">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold backdrop-blur">B</div>
          <h1 className="font-display text-3xl font-bold">BPM System</h1>
          <p className="text-sm text-white/70">Внутренняя система банковских процессов</p>
        </div>
        <div className="card">
          <h2 className="mb-1 text-xl font-bold text-slate-800 dark:text-slate-100">Вход в систему</h2>
          <p className="mb-5 text-sm text-slate-500">Используйте корпоративные учётные данные</p>
          <div className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
            </div>
            <div>
              <label className="label">Пароль</label>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
            </div>
            <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full">
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/50">
            <p className="font-semibold">Демо-доступы:</p>
            <p>admin@bank.tj / admin123 (Admin)</p>
            <p>manager@bank.tj / manager123 (Manager)</p>
            <p>employee@bank.tj / employee123 (Employee)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
