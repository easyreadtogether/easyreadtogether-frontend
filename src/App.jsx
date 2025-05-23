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
import IPTracker from './components/IpTracker'
function ProtectedRoute ({ children }) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return <>{children}</>
}

function App () {
  return (
    <div>
      <ScrollToTop />
      <IPTracker />
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
