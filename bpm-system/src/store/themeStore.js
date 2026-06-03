import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Dark mode store. Toggling updates the <html class="dark"> which Tailwind uses.
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light'
        applyTheme(next)
        set({ theme: next })
      },
      initTheme: () => applyTheme(get().theme),
    }),
    { name: 'bpm-theme' }
  )
)

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}
