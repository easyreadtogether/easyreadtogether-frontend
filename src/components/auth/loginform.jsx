import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/authstore'
import axios from 'axios'
export function LoginForm () {
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = async values => {
    setLoading(true)
    try {
      // Make API call to your authentication endpoint
      const response = await axios.post(
        'https://easyreadtogether-backend-app.com/api/authenticate',
        {
          password: values.password
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      // Assuming your API returns user data upon successful authentication
      if (response.data && response?.data?.success) {
        login()
        navigate('/simplify')
      }

      if (response?.data && !response.data?.success) {
        setError('Invalid Credentials')
      }

      console.log(response.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='password'
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    {...field}
                    autoComplete='current-password'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-2 top-1/2 -translate-y-1/2 h-6 px-2 text-xs'
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className='p-3 text-sm text-white bg-destructive rounded-md'>
            {error}
          </div>
        )}

        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </Form>
  )
}
