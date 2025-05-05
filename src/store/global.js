import { create } from 'zustand'

export const useGlobal = create(set => ({
  authenticated: !!localStorage.getItem('token'),

  login: token => {
    const secrets = JSON.stringify({
      access_token: token
    })
    localStorage.setItem('token', secrets) // Removed JSON.stringify since token should already be a string
    set({ authenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token') // Fixed typo: was 'tokens' (plural)
    set({ authenticated: false })
  }
}))
