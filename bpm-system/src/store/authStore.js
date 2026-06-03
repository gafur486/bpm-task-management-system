import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Global auth state with Zustand. `persist` keeps it in localStorage so a page
// refresh does not log the user out.
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: ({ user, token }) => {
        localStorage.setItem('bpm_token', token)
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem('bpm_token')
        set({ user: null, token: null, isAuthenticated: false })
      },

      // Role helpers for role-based access (Admin, Manager, Employee).
      hasRole: (roles) => {
        const role = useAuthStore.getState().user?.role
        return Array.isArray(roles) ? roles.includes(role) : role === roles
      },
    }),
    { name: 'bpm-auth' }
  )
)
