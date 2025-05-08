import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/auth/loginform'
import { useAuthStore } from '@/store/authstore'

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
      </div>
    </div>
  )
}

export default Login
