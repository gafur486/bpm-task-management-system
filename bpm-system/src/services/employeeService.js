import apiClient from '@/api/client'

// Employee directory service with server-side search & pagination support
// (json-server supports _page, _limit, q out of the box).
export const employeeService = {
  getAll: async ({ q = '', page = 1, limit = 6 } = {}) => {
    const { data, headers } = await apiClient.get('/employees', {
      params: { q: q || undefined, _page: page, _limit: limit },
    })
    const total = Number(headers['x-total-count'] || data.length)
    return { items: data, total }
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/employees/${id}`)
    return data
  },
}
