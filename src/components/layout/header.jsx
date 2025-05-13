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
      <div className='container mx-auto flex h-20 px-4 items-center justify-between'>
        <Link
          to={isAuthenticated ? '/simplify' : '/'}
          className='flex items-center gap-2'
        >
          <img src='/logo.png' alt='fenix logo' className='h-16 w-16' />
        </Link>

        <div className='flex items-center gap-4'>
          <ThemeToggle />

          {isAuthenticated ? (
            <div className='flex flex-row items-center gap-3'>
              <Button asChild variant='default'>
                <Link to='/simplify' className='flex items-center gap-2'>
                  Simplify
                </Link>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleLogout}
                title='Logout'
              >
                <LogOut className='h-4 w-4' />
                <span className='sr-only'>Logout</span>
              </Button>
            </div>
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
