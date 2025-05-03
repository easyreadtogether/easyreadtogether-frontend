import React from 'react'
import { Link } from 'react-router-dom'

const PromoSection = () => {
  return (
    <div className='relative overflow-hidden bg-primary text-neutral'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Text Content */}
          <div className='space-y-6 z-10'>
            <h2 className='text-3xl md:text-4xl text-neutral lg:text-5xl font-bold'>
              Discover the <span className='text-accent'>Elegance</span> of
              Ethiopian Coffee
            </h2>
            <p className='text-lg md:text-xl text-neutral-200'>
              Experience our premium single-origin coffees, sustainably sourced
              from the highlands of Ethiopia. Limited time offer - 15% off your
              first wholesale order.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <Link
                to='/products'
                className='cta_btn bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300 text-center'
              >
                Explore Our Coffees
              </Link>
              <Link
                to='/wholesale'
                className='cta_btn border-2 border-accent text-accent hover:bg-accent/10 px-8 py-3 rounded-md font-medium transition-colors duration-300 text-center'
              >
                Wholesale Inquiry
              </Link>
            </div>
          </div>

          {/* Image/Visual */}
          <div className='relative'>
            <div className='bg-accent/10 rounded-xl overflow-hidden aspect-square flex items-center justify-center'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent/20 flex items-center justify-center'>
                  <div className='w-48 h-48 md:w-60 md:h-60 rounded-full bg-accent/30 flex items-center justify-center'>
                    <div className='w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent/40 flex items-center justify-center'>
                      <svg
                        className='w-20 h-20 md:w-24 md:h-24 text-accent'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <span className='absolute bottom-6 right-6 text-sm text-accent font-medium'>
                *Offer valid until June 30th
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full opacity-10'>
        <div className='absolute top-20 left-20 w-32 h-32 rounded-full bg-accent'></div>
        <div className='absolute bottom-10 right-20 w-48 h-48 rounded-full bg-accent'></div>
      </div>
    </div>
  )
}

export default PromoSection
