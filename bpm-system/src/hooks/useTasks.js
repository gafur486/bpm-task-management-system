import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/taskService'
import { useNotificationStore } from '@/store/notificationStore'

// Custom hooks wrapping React Query. Components stay clean — they just call
// useTasks() and get data + loading + error, plus mutation helpers.

export function useTasks(params) {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: () => taskService.getAll(params),
  })
}

export function useTask(id) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  })
}

export function useTaskMutations() {
  const qc = useQueryClient()
  const notify = useNotificationStore((s) => s.addNotification)

  // After any change we invalidate the 'tasks' cache so the list refetches.
  const invalidate = () => qc.invalidateQueries({ queryKey: ['tasks'] })

  const create = useMutation({
    mutationFn: taskService.create,
    onSuccess: () => { invalidate(); notify('Задача создана', 'success') },
    onError: (e) => notify(e.message, 'error'),
  })

  const update = useMutation({
    mutationFn: ({ id, data }) => taskService.update(id, data),
    onSuccess: () => { invalidate(); notify('Задача обновлена', 'success') },
    onError: (e) => notify(e.message, 'error'),
  })

  const remove = useMutation({
    mutationFn: taskService.remove,
    onSuccess: () => { invalidate(); notify('Задача удалена', 'success') },
    onError: (e) => notify(e.message, 'error'),
  })

  return { create, update, remove }
}
