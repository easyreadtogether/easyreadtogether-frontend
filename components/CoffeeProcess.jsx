import React from 'react'

const CoffeeProcess = () => {
  return (
    <section className='bg-accent text-neutral p-8 md:p-12 rounded-lg'>
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl text-white font-bold mb-6 text-center'>
        From Our Farms to Your Cup
      </h2>
      <p className='text-lg text-white mb-8 text-center'>
        Discover the journey of our premium Ethiopian coffee beans from the
        highland farms to international markets.
      </p>
      <div className='grid md:grid-cols-3 gap-6'>
        <div className='text-center'>
          <div className='bg-accent/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
            <svg
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
              />
            </svg>
          </div>
          <h3 className='text-xl text-white font-semibold mb-2'>
            Sustainable Farming
          </h3>
          <p className='text-neutral-200'>
            Partnering with smallholder farmers using traditional, eco-friendly
            cultivation methods.
          </p>
        </div>
        <div className='text-center'>
          <div className='bg-accent/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
            <svg
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </svg>
          </div>
          <h3 className='text-xl text-white font-semibold mb-2'>
            Careful Processing
          </h3>
          <p className='text-neutral-200'>
            Hand-picked cherries processed with meticulous attention to quality
            at our washing stations.
          </p>
        </div>
        <div className='text-center'>
          <div className='bg-accent/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
            <svg
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
              />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white'>
            Global Export
          </h3>
          <p className='text-neutral-200'>
            Efficient logistics ensuring fresh arrival of our green beans to
            roasters worldwide.
          </p>
        </div>
      </div>
    </div>
  </section>
  )

}

export default CoffeeProcess
