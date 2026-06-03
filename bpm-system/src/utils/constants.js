// Centralised constants used across the app.

export const TASK_STATUSES = ['New', 'In Progress', 'Review', 'Completed']

export const STATUS_LABELS = {
  New: 'Новая',
  'In Progress': 'В работе',
  Review: 'На проверке',
  Completed: 'Завершена',
}

export const STATUS_STYLES = {
  New: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Review: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

export const PRIORITIES = ['Low', 'Medium', 'High']
export const PRIORITY_LABELS = { Low: 'Низкий', Medium: 'Средний', High: 'Высокий' }

export const ROLES = { ADMIN: 'Admin', MANAGER: 'Manager', EMPLOYEE: 'Employee' }

export const REQUEST_STATUSES = ['Draft', 'Submitted', 'Approved', 'Rejected']
export const REQUEST_STATUS_LABELS = {
  Draft: 'Черновик',
  Submitted: 'На рассмотрении',
  Approved: 'Одобрено',
  Rejected: 'Отклонено',
}
