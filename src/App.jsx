import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import Simplify from './pages/Simplify'
import Result from './pages/Result'
import Home from './pages/Home'
import { useAuthStore } from './store/authstore'
import ScrollToTop from './components/ScrollToTop'
import { Navigate } from 'react-router-dom'
import { Header } from '@/components/layout/header'
import NotFound from '@/pages/NotFound'
function ProtectedRoute ({ children }) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }
  return <>{children}</>
}

function App () {
  useEffect(() => {
    // Add fade in animation to the main element
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.classList.add('animate-in', 'fade-in', 'duration-300')
    }
  }, [])
  return (
    <div>
      <ScrollToTop />
      <Header />

      {/* Conditionally render NavBar */}
      {/* {!shouldHideLayout && <NavBar />} */}

      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/login' element={<Login />} />
          <Route
            path='/simplify'
            element={
              <ProtectedRoute>
                <Simplify />
              </ProtectedRoute>
            }
          />
          <Route
            path='/result'
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
