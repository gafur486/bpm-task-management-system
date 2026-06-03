import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { requestService } from '@/services/requestService'
import { useNotificationStore } from '@/store/notificationStore'

export function useRequests() {
  return useQuery({ queryKey: ['requests'], queryFn: requestService.getAll })
}

export function useRequest(id) {
  return useQuery({
    queryKey: ['request', id],
    queryFn: () => requestService.getById(id),
    enabled: !!id,
  })
}

export function useRequestMutations() {
  const qc = useQueryClient()
  const notify = useNotificationStore((s) => s.addNotification)
  const invalidate = () => qc.invalidateQueries({ queryKey: ['requests'] })

  const create = useMutation({
    mutationFn: requestService.create,
    onSuccess: () => { invalidate(); notify('Заявка отправлена', 'success') },
    onError: (e) => notify(e.message, 'error'),
  })

  const changeStatus = useMutation({
    mutationFn: ({ id, status, note }) => requestService.updateStatus(id, status, note),
    onSuccess: () => {
      invalidate()
      qc.invalidateQueries({ queryKey: ['request'] })
      notify('Статус заявки обновлён', 'success')
    },
    onError: (e) => notify(e.message, 'error'),
  })

  return { create, changeStatus }
}
