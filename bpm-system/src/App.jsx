import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import ProtectedRoute from '@/routes/ProtectedRoute'
import DashboardLayout from '@/layouts/DashboardLayout'
import Notifications from '@/components/Notifications'

import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import TasksPage from '@/pages/TasksPage'
import EmployeesPage from '@/pages/EmployeesPage'
import EmployeeDetailPage from '@/pages/EmployeeDetailPage'
import WorkflowPage from '@/pages/WorkflowPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { ROLES } from '@/utils/constants'

export default function App() {
  const initTheme = useThemeStore((s) => s.initTheme)

  // Apply saved theme (light/dark) on first load.
  useEffect(() => { initTheme() }, [initTheme])

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* All routes below require authentication */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailPage />} />
          {/* Workflow approvals are restricted by role inside the page */}
          <Route path="/workflow" element={<WorkflowPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Notifications />
    </>
  )
}
