import { STATUS_LABELS, STATUS_STYLES } from '@/utils/constants'

// Small coloured pill showing a task status.
export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] || ''}`}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}
