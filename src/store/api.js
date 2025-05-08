import axios from 'axios'
import { useGlobal } from './global'

export const api = axios.create({
  baseURL: 'http://18.218.138.236:8000/api/'
})

// Request interceptor to attach the access token
api.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('token') || '{}')
    if (token?.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  response => response,
  error => {
    const { logout } = useGlobal.getState()
    
    if (error.response?.status === 401) {
      // Token expired or invalid - log user out
      logout()
      
      // Optionally redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)