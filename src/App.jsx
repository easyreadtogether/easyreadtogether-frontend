import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { useGlobal } from './core/global'
import ScrollToTop from './components/ScrollToTop'
import { NavBar } from './components/NavBar'

function App () {
  const { authenticated } = useGlobal()
  const location = useLocation()

  // Define routes where NavBar and Footer should be hidden
  const hiddenRoutes = ['/login', '/admin', '/manage-news']
  const shouldHideLayout = hiddenRoutes.some(route =>
    location.pathname.startsWith(route)
  )

  return (
    <div
      className={`bg-neutral/20 min-h-screen flex flex-col justify-center items-center overflow-x-hidden ${
        shouldHideLayout ? '' : ''
      }`}
    >
      <ScrollToTop />

      {/* Conditionally render NavBar */}
      {/* {!shouldHideLayout && <NavBar />} */}

      <div className={`w-full ${shouldHideLayout ? '' : 'pt-[50px]'}`}>
        <Routes>
          {authenticated ? (
            <>
              <Route path='/upload' element={<Dashboard />} />
            </>
          ) : null}

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
