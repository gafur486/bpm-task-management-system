import apiClient from '@/api/client'

// Task service: full CRUD against the REST API.
// Maps directly to the endpoints required by the spec:
//   GET /tasks, GET /tasks/:id, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id
export const taskService = {
  getAll: async (params = {}) => {
    const { data } = await apiClient.get('/tasks', { params })
    return data
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/tasks/${id}`)
    return data
  },
  create: async (task) => {
    const payload = { ...task, createdAt: new Date().toISOString() }
    const { data } = await apiClient.post('/tasks', payload)
    return data
  },
  update: async (id, task) => {
    const { data } = await apiClient.put(`/tasks/${id}`, task)
    return data
  },
  remove: async (id) => {
    await apiClient.delete(`/tasks/${id}`)
    return id
  },
}
