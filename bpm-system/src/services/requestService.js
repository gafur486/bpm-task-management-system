import apiClient from '@/api/client'

// BPM workflow request service. A "request" moves through an approval workflow:
//   Draft -> Submitted -> Approved / Rejected
export const requestService = {
  getAll: async () => {
    const { data } = await apiClient.get('/requests')
    return data
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/requests/${id}`)
    return data
  },
  create: async (request) => {
    const payload = {
      ...request,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      history: [
        { status: 'Submitted', at: new Date().toISOString(), note: 'Заявка создана' },
      ],
    }
    const { data } = await apiClient.post('/requests', payload)
    return data
  },
  updateStatus: async (id, status, note = '') => {
    const current = await requestService.getById(id)
    const history = [
      ...(current.history || []),
      { status, at: new Date().toISOString(), note },
    ]
    const { data } = await apiClient.put(`/requests/${id}`, { ...current, status, history })
    return data
  },
}
