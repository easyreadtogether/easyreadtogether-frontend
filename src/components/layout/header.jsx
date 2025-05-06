import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuthStore } from '@/store/authstore'

export function Header () {
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b'>
      <div className='container mx-auto flex h-16 px-4 items-center justify-between'>
        <Link
          to={isAuthenticated ? '/simplify' : '/'}
          className='flex items-center gap-2'
        >
          <span className='font-bold text-xl'>Simplify</span>
        </Link>

        <div className='flex items-center gap-4'>
          <ThemeToggle />

          {isAuthenticated ? (
            <Button
              variant='ghost'
              size='icon'
              onClick={handleLogout}
              title='Logout'
            >
              <LogOut className='h-4 w-4' />
              <span className='sr-only'>Logout</span>
            </Button>
          ) : (
            <Button asChild variant='default'>
              <Link to='/login' className='flex items-center gap-2'>
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
