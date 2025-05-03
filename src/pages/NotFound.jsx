import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='h-full w-full py-48 gap-3 flex items-center justify-center flex-col'>
      <h1 className='text-[100px]'>404</h1>
      <h3>Page Not Found</h3>
      <p>Sorry, We could not find the page You are looking for!</p>
      <Link to='/' className='cta_btn'>
        <span>Back to Home</span>
      </Link>
    </div>
  )
}

export default NotFound
