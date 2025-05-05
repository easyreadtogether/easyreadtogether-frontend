import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/usetheme'

export function ThemeToggle () {
  const { mode, setMode } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component doesn't render differently between server and client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant='outline'
      size='icon'
      className='rounded-full'
      onClick={toggleTheme}
    >
      {mode === 'light' ? (
        <Moon className='h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
