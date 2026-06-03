import { useState, useMemo } from 'react'
import { useTasks, useTaskMutations } from '@/hooks/useTasks'
import StatusBadge from '@/components/StatusBadge'
import Spinner from '@/components/Spinner'
import ErrorState from '@/components/ErrorState'
import EmptyState from '@/components/EmptyState'
import Modal from '@/components/Modal'
import TaskForm from '@/components/TaskForm'
import { TASK_STATUSES, STATUS_LABELS, PRIORITY_LABELS } from '@/utils/constants'
import { formatDate } from '@/utils/formatters'
import { exportToCsv } from '@/utils/exportCsv'

export default function TasksPage() {
  const { data: tasks = [], isLoading, isError, refetch } = useTasks()
  const { create, update, remove } = useTaskMutations()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [tasks, search, statusFilter])

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (task) => { setEditing(task); setModalOpen(true) }

  const handleSubmit = (form) => {
    if (editing) {
      update.mutate({ id: editing.id, data: form }, { onSuccess: () => setModalOpen(false) })
    } else {
      create.mutate(form, { onSuccess: () => setModalOpen(false) })
    }
  }

  if (isLoading) return <Spinner />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">Задачи</h1>
          <p className="text-sm text-slate-500">Управление рабочими задачами</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportToCsv('tasks.csv', filtered)} className="btn-ghost border border-slate-200 dark:border-slate-700">Экспорт CSV</button>
          <button onClick={openCreate} className="btn-primary">+ Новая задача</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <input className="input max-w-xs" placeholder="Поиск по названию..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="input max-w-[180px]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">Все статусы</option>
          {TASK_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Задачи не найдены" description="Попробуйте изменить фильтры или создайте новую задачу." />
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-800">
              <tr>
                <th className="p-4 font-medium">Название</th>
                <th className="p-4 font-medium">Статус</th>
                <th className="p-4 font-medium">Приоритет</th>
                <th className="p-4 font-medium">Исполнитель</th>
                <th className="p-4 font-medium">Создана</th>
                <th className="p-4 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-200">{t.title}</td>
                  <td className="p-4"><StatusBadge status={t.status} /></td>
                  <td className="p-4 text-slate-500">{PRIORITY_LABELS[t.priority] || t.priority}</td>
                  <td className="p-4 text-slate-500">{t.assignee || '—'}</td>
                  <td className="p-4 text-slate-400">{formatDate(t.createdAt)}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(t)} className="mr-2 text-brand-500 hover:underline">Изменить</button>
                    <button onClick={() => { if (confirm('Удалить задачу?')) remove.mutate(t.id) }} className="text-red-500 hover:underline">Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Редактировать задачу' : 'Новая задача'}>
        <TaskForm initial={editing} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} submitting={create.isPending || update.isPending} />
      </Modal>
    </div>
  )
}
