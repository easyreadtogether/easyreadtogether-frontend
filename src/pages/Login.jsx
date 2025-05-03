import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PiLockKey, PiUser } from 'react-icons/pi'
import axios from 'axios'
import { useGlobal } from '../core/global'
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useGlobal()

  const validateForm = () => {
    let valid = true
    const newErrors = { username: '', password: '' }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      valid = false
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters'
      valid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setErrors(prev => ({ ...prev, general: '' }))

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        'https://api.elegancoffee.com/api/login',
        {
          username: formData.username,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      // Handle successful login
      const { token } = response.data

      // Store the token (in localStorage or cookies)
      login(token)

      // Redirect to admin dashboard
      navigate('/admin')
    } catch (error) {
      console.log(error)
      let errorMessage = 'Login failed. Please try again.'

      if (error.response) {
        // Handle different HTTP status codes
        switch (error.response.status) {
          case 401:
            errorMessage = 'Invalid username or password'
            break
          case 500:
            errorMessage = 'Server error. Please try again later.'
            break
          default:
            errorMessage = error?.response?.data?.message || errorMessage
        }
      }

      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-primary/5 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden'>
        {/* Header */}
        <div className='bg-primary p-6 text-center'>
          <h1 className='text-2xl font-bold text-white'>ELEGANCE COFFEE</h1>
          <p className='text-neutral-200 mt-1'>Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className='p-8' noValidate>
          {errors.general && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm'>
              {errors.general}
            </div>
          )}

          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Username
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <PiUser className='text-gray-400' />
              </div>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`}
                placeholder='Enter your username'
                autoComplete='username'
              />
            </div>
            {errors.username && (
              <p className='mt-1 text-sm text-red-600'>{errors.username}</p>
            )}
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <PiLockKey className='text-gray-400' />
              </div>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`}
                placeholder='••••••••'
                autoComplete='current-password'
              />
            </div>
            {errors.password && (
              <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className='mt-4 text-center text-sm text-gray-600'>
            <p>For authorized personnel only</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
