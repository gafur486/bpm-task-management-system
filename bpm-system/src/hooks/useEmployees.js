import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { employeeService } from '@/services/employeeService'

export function useEmployees({ q, page, limit }) {
  return useQuery({
    queryKey: ['employees', q, page, limit],
    queryFn: () => employeeService.getAll({ q, page, limit }),
    placeholderData: keepPreviousData, // smooth pagination, no flicker
  })
}

export function useEmployee(id) {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
  })
}
