import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export const useAuthStore = create()(
  persist(
    set => ({
      isAuthenticated: false,

      login: async => {
        localStorage.setItem('authenticated', true)
        set({
          isAuthenticated: true
        })
      },
      logout: () => {
        localStorage.removeItem('authenticated')

        set({
          isAuthenticated: false
        })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
