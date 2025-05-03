import React from 'react'
import { Link } from 'react-router-dom'
import { PiArrowRightLight } from 'react-icons/pi'
const Stroies = ({ story }) => {
  return (
    <div className='w-[full] flex flex-col '>
      <div className=' p-6 h-[250px] '>
        <h3 className='text-2xl font-semibold mb-4 text-[var(--color-primary)]'>
          {story.title}
        </h3>
        <p className='mb-6 text-[var(--color-primary)]'>{story.subtitle}</p>
        <Link
          className='flex items-center font-bold pb-1 w-max self-start gap-4 text-accent hover:border-b-accent border-b border-b-transparent'
          to={`/company/success-stories/`}
        >
          <span>Read Full Story </span>
          <PiArrowRightLight />
        </Link>
      </div>

      <img
        src={'/img.avif'}
        alt='Urban greening transformation'
        className=' object-cover w-full h-full max-h-[400px]'
      />
    </div>
  )
}

export default Stroies
