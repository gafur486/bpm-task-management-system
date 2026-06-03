import { create } from 'zustand'

// Lightweight toast/notification system. Components call addNotification()
// and a <Notifications/> component renders them.
let idCounter = 0

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  addNotification: (message, type = 'info') => {
    const id = ++idCounter
    set((s) => ({ notifications: [...s.notifications, { id, message, type }] }))
    // Auto-dismiss after 4s
    setTimeout(() => get().removeNotification(id), 4000)
  },
  removeNotification: (id) =>
    set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
}))
