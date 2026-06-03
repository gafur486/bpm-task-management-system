import { useState, useEffect } from 'react'
import { TASK_STATUSES, STATUS_LABELS, PRIORITIES, PRIORITY_LABELS } from '@/utils/constants'

// Reusable form for both creating and editing a task.
export default function TaskForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState({
    title: '', description: '', status: 'New', priority: 'Medium', assignee: '',
  })

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Название</label>
        <input className="input" value={form.title} onChange={set('title')} placeholder="Например: Проверить кредитную заявку" />
      </div>
      <div>
        <label className="label">Описание</label>
        <textarea className="input min-h-[80px]" value={form.description} onChange={set('description')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Статус</label>
          <select className="input" value={form.status} onChange={set('status')}>
            {TASK_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Приоритет</label>
          <select className="input" value={form.priority} onChange={set('priority')}>
            {PRIORITIES.map((p) => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Исполнитель</label>
        <input className="input" value={form.assignee} onChange={set('assignee')} placeholder="Имя сотрудника" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onCancel} className="btn-ghost">Отмена</button>
        <button onClick={() => onSubmit(form)} disabled={submitting || !form.title} className="btn-primary">
          {submitting ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}
