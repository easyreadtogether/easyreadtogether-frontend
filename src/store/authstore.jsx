import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          // Simulate API call - in a real app, this would be an actual API call
          await new Promise(resolve => setTimeout(resolve, 1000))

          // Mock successful login
          if (email && password) {
            set({
              user: { email, id: '1' },
              isAuthenticated: true,
              loading: false
            })
          } else {
            throw new Error('Invalid credentials')
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            loading: false
          })
        }
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
