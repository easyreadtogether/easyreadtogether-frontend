import { useEffect } from 'react'

import { useThemeStore } from '@/store/themestore'
export function useTheme () {
  const { mode, setMode } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    root.classList.add(mode)
  }, [mode])

  return { mode, setMode }
}
