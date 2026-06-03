import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEmployees } from '@/hooks/useEmployees'
import Spinner from '@/components/Spinner'
import ErrorState from '@/components/ErrorState'
import EmptyState from '@/components/EmptyState'
import { initials } from '@/utils/formatters'

const LIMIT = 6

export default function EmployeesPage() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, refetch, isPlaceholderData } = useEmployees({ q, page, limit: LIMIT })

  const items = data?.items || []
  const total = data?.total || 0
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">Сотрудники</h1>
        <p className="text-sm text-slate-500">Справочник сотрудников банка</p>
      </div>

      <input
        className="input max-w-sm"
        placeholder="Поиск по имени или отделу..."
        value={q}
        onChange={(e) => { setQ(e.target.value); setPage(1) }}
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : items.length === 0 ? (
        <EmptyState title="Сотрудники не найдены" />
      ) : (
        <>
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${isPlaceholderData ? 'opacity-60' : ''}`}>
            {items.map((emp) => (
              <Link key={emp.id} to={`/employees/${emp.id}`} className="card transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 font-bold text-white">{initials(emp.name)}</div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{emp.name}</p>
                    <p className="text-sm text-slate-500">{emp.position}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-400">
                  <span>{emp.department}</span>
                  <span>{emp.email}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost border border-slate-200 dark:border-slate-700">← Назад</button>
            <span className="text-sm text-slate-500">Страница {page} из {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="btn-ghost border border-slate-200 dark:border-slate-700">Вперёд →</button>
          </div>
        </>
      )}
    </div>
  )
}
