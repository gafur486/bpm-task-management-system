import { useState } from 'react'
import { useRequests, useRequestMutations } from '@/hooks/useRequests'
import { useAuthStore } from '@/store/authStore'
import Spinner from '@/components/Spinner'
import ErrorState from '@/components/ErrorState'
import EmptyState from '@/components/EmptyState'
import Modal from '@/components/Modal'
import { REQUEST_STATUS_LABELS, ROLES } from '@/utils/constants'
import { formatDateTime } from '@/utils/formatters'

const statusStyle = {
  Draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800',
  Submitted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export default function WorkflowPage() {
  const { data: requests = [], isLoading, isError, refetch } = useRequests()
  const { create, changeStatus } = useRequestMutations()
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ title: '', type: 'Отпуск', description: '', author: '' })

  const canApprove = [ROLES.ADMIN, ROLES.MANAGER].includes(user?.role)

  const submit = () => {
    create.mutate({ ...form, author: form.author || user?.name }, { onSuccess: () => { setOpen(false); setForm({ title: '', type: 'Отпуск', description: '', author: '' }) } })
  }

  if (isLoading) return <Spinner />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">Заявки (BPM)</h1>
          <p className="text-sm text-slate-500">Бизнес-процесс согласования заявок</p>
        </div>
        <button onClick={() => setOpen(true)} className="btn-primary">+ Создать заявку</button>
      </div>

      {requests.length === 0 ? (
        <EmptyState title="Нет заявок" description="Создайте первую заявку для запуска процесса согласования." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {requests.map((r) => (
            <div key={r.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{r.title}</p>
                  <p className="text-xs text-slate-400">{r.type} · {r.author}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[r.status]}`}>{REQUEST_STATUS_LABELS[r.status]}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{r.description}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setSelected(r)} className="text-sm text-brand-500 hover:underline">История</button>
                {canApprove && r.status === 'Submitted' && (
                  <>
                    <button onClick={() => changeStatus.mutate({ id: r.id, status: 'Approved', note: `Одобрено: ${user.name}` })} className="text-sm text-emerald-600 hover:underline">Одобрить</button>
                    <button onClick={() => changeStatus.mutate({ id: r.id, status: 'Rejected', note: `Отклонено: ${user.name}` })} className="text-sm text-red-500 hover:underline">Отклонить</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create request modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Новая заявка">
        <div className="space-y-4">
          <div>
            <label className="label">Заголовок</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="label">Тип заявки</label>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Отпуск</option><option>Командировка</option><option>Закупка</option><option>Доступ к системе</option>
            </select>
          </div>
          <div>
            <label className="label">Описание</label>
            <textarea className="input min-h-[80px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-ghost">Отмена</button>
            <button onClick={submit} disabled={!form.title || create.isPending} className="btn-primary">{create.isPending ? 'Отправка...' : 'Отправить'}</button>
          </div>
        </div>
      </Modal>

      {/* History timeline modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="История заявки">
        {selected && (
          <ol className="relative space-y-4 border-l-2 border-slate-200 pl-5 dark:border-slate-700">
            {(selected.history || []).map((h, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-brand-500" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{REQUEST_STATUS_LABELS[h.status]}</p>
                <p className="text-xs text-slate-400">{formatDateTime(h.at)}</p>
                {h.note && <p className="text-sm text-slate-500">{h.note}</p>}
              </li>
            ))}
          </ol>
        )}
      </Modal>
    </div>
  )
}
