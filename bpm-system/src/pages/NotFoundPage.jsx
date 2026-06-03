import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-display text-6xl font-bold text-brand-500">404</h1>
      <p className="text-slate-500">Страница не найдена</p>
      <Link to="/dashboard" className="btn-primary">На главную</Link>
    </div>
  )
}
