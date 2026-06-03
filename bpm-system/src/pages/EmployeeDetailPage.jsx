import { useParams, Link } from 'react-router-dom'
import { useEmployee } from '@/hooks/useEmployees'
import Spinner from '@/components/Spinner'
import ErrorState from '@/components/ErrorState'
import { initials } from '@/utils/formatters'

export default function EmployeeDetailPage() {
  const { id } = useParams()
  const { data: emp, isLoading, isError, refetch } = useEmployee(id)

  if (isLoading) return <Spinner />
  if (isError || !emp) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-5">
      <Link to="/employees" className="text-sm text-brand-500 hover:underline">← К списку сотрудников</Link>
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-bold text-white">{initials(emp.name)}</div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">{emp.name}</h1>
            <p className="text-slate-500">{emp.position}</p>
          </div>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Отдел" value={emp.department} />
          <Field label="Email" value={emp.email} />
          <Field label="Телефон" value={emp.phone} />
          <Field label="Роль" value={emp.role} />
        </dl>
      </div>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="font-medium text-slate-700 dark:text-slate-200">{value || '—'}</dd>
    </div>
  )
}
