import axios from 'axios'

// Base URL of the REST API. In real banking systems this points to a backend
// gateway; here it points to our mock json-server (see db.json).
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Single shared Axios instance for the whole app.
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// --- Request interceptor ---
// Runs before every request leaves the app. We attach the JWT token here so
// each individual service file does NOT need to remember to add it.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bpm_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// --- Response interceptor ---
// Runs after every response comes back. Central place for global error handling:
// e.g. if the token expired (401), we log the user out automatically.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      localStorage.removeItem('bpm_token')
      // Hard redirect to login. In a larger app we'd use the router instead.
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    // Normalise the error message so UI components can show something useful.
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Произошла непредвиденная ошибка'
    return Promise.reject(new Error(message))
  }
)

export default apiClient
