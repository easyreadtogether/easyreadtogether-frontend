import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/auth/loginform'
import { useAuthStore } from '@/store/authStore'

function Login () {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/simplify')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='container px-4 mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)]'>
      <div className='w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-sm border'>
        <div className='space-y-2 text-center'>
          <h2 className='text-3xl font-bold'>Welcome back</h2>
          <p className='text-muted-foreground'>
            Log in to your account to continue
          </p>
        </div>

        <LoginForm />

        <div className='text-center text-sm text-muted-foreground'>
          <p>
            By logging in, you agree to our{' '}
            <a
              href='#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
