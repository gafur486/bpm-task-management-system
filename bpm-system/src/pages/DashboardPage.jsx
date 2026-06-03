import { useTasks } from '@/hooks/useTasks'
import { useRequests } from '@/hooks/useRequests'
import { useAuthStore } from '@/store/authStore'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import Spinner from '@/components/Spinner'
import { formatDateTime } from '@/utils/formatters'
import { TASK_STATUSES } from '@/utils/constants'

const icon = (d) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={d} /></svg>
)

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const { data: tasks = [], isLoading } = useTasks()
  const { data: requests = [] } = useRequests()

  if (isLoading) return <Spinner />

  const byStatus = (s) => tasks.filter((t) => t.status === s).length
  const recent = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">Здравствуйте, {user?.name}</h1>
        <p className="text-sm text-slate-500">Обзор рабочих процессов на сегодня</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего задач" value={tasks.length} accent="brand" icon={icon('M9 11l3 3L22 4')} />
        <StatCard label="В работе" value={byStatus('In Progress')} accent="blue" icon={icon('M12 2v4M12 18v4M2 12h4M18 12h4')} />
        <StatCard label="На проверке" value={byStatus('Review')} accent="gold" icon={icon('M22 11.08V12a10 10 0 1 1-5.93-9.14')} />
        <StatCard label="Заявок BPM" value={requests.length} accent="emerald" icon={icon('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z')} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Последние задачи</h2>
          <div className="space-y-3">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200">{t.title}</p>
                  <p className="text-xs text-slate-400">{formatDateTime(t.createdAt)}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Распределение по статусам</h2>
          <div className="space-y-3">
            {TASK_STATUSES.map((s) => {
              const count = byStatus(s)
              const pct = tasks.length ? Math.round((count / tasks.length) * 100) : 0
              return (
                <div key={s}>
                  <div className="mb-1 flex justify-between text-sm">
                    <StatusBadge status={s} />
                    <span className="text-slate-500">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
