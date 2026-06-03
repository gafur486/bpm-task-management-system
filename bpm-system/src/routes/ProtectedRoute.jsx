import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// Wraps private pages. If not logged in -> redirect to /login.
// Optional `roles` prop restricts access by role (role-based access control).
export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
