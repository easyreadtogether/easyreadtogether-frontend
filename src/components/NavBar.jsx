import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link, useLocation, NavLink } from 'react-router-dom'
export const NavBar = () => {
  const [nav, setNav] = useState(false)

  const toggleNav = () => {
    setNav(!nav)
  }

  const location = useLocation()

  const isHomePage = location.pathname === '/'

  return (
    <nav className='w-full bg-white  text-white z-50  h-[70px] fixed top-0'>
      <div className='max-w-[1240px] mx-auto flex justify-between items-center px-4'>
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <img
            className=' h-14 md:h-16 object-contain'
            src='logo.png'
            alt='Website Logo'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center py-0 h-full'>
          <ul className='flex items-center space-x-1 h-full'>
            {[
              'About Us',
              'News',
              'Capabilities',
              'Success Story',
              'Partnership'
            ].map(item => (
              <React.Fragment key={item}>
                <li className='group relative mr-3 h-full'>
                  <NavLink
                    to={`${item.toLowerCase().replace(' ', '-')}`}
                    className={`px-4 hover:border-b-accent text-accent border-b-3 border-b-transparent mt-2 pb-3 transition-colors `}
                  >
                    {item}
                  </NavLink>
                </li>
              </React.Fragment>
            ))}
          </ul>

          <Link to='/contactus' className='cta_btn ml-6'>
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button onClick={toggleNav} className='p-2 focus:outline-none'>
            {nav ? (
              <AiOutlineClose size={28} className='text-black' />
            ) : (
              <AiOutlineMenu size={28} color={'black'} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {nav && (
          <div
            className={`md:hidden absolute top-16 h-screen left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-[500] ${
              nav ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <ul className='flex flex-col w-full py-4 space-y-4'>
              {[
                'About Us',
                'News',
                'Capabilities',
                'Success Story',
                'Partnership'
              ].map(item => (
                <li key={item} className='w-full text-center'>
                  <Link
                    onClick={() => setNav(false)}
                    to={`${item.toLowerCase().replace(' ', '-')}`}
                    className={`px-4  hover:border-b-accent border-b-3 border-b-transparent w-full mt-2 pb-4 transition-colors text-accent `}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li className='w-full px-4 pt-2'>
                <Link
                  onClick={() => setNav(false)}
                  to='/contactus'
                  className='w-full cta_btn inline-block text-center'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
