import apiClient from '@/api/client'

// Auth service: all authentication-related API calls live here.
// In a real banking backend these hit /auth/login etc. With json-server we
// emulate it by reading the `users` collection and matching credentials.
export const authService = {
  async login({ email, password }) {
    // json-server has no real auth, so we query users and match manually.
    const { data } = await apiClient.get('/users', { params: { email } })
    const user = data?.[0]
    if (!user || user.password !== password) {
      throw new Error('Неверный email или пароль')
    }
    // Fake a JWT-like token (in production the backend signs this).
    const token = btoa(`${user.id}:${user.role}:${Date.now()}`)
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role }
    return { token, user: safeUser }
  },
}
