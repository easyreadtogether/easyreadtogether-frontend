import React from 'react'

const HeroIllustration = () => {
  return (
    <div className='relative w-full max-w-md mx-auto'>
      <div className='absolute -left-6 top-10 w-20 h-28 bg-blue-100 rounded-lg transform -rotate-12 shadow-md flex items-center justify-center'>
        <div className='w-16 h-4 bg-gray-400 mb-1'></div>
        <div className='w-16 h-4 bg-gray-300 mb-1'></div>
        <div className='w-16 h-4 bg-gray-200'></div>
      </div>

      <div className='absolute left-16 top-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center animate-pulse'>
        <div className='w-8 h-8 bg-purple-300 rounded-full'></div>
      </div>

      <div className='absolute right-20 top-6 w-14 h-14 bg-green-100 rounded-lg transform rotate-45'></div>

      <div className='relative w-64 h-80 mx-auto bg-white dark:bg-white/30 backdrop-blur-3xl rounded-xl shadow-lg p-4 z-10'>
        <div className='w-12 h-12 bg-blue-500 rounded-full absolute -top-6 -right-6 flex items-center justify-center text-white text-xl font-bold'>
          AI
        </div>

        <div className='flex flex-col h-full'>
          <div className='flex items-center mb-4'>
            <div className='w-8 h-8 bg-yellow-300 rounded-md mr-2'></div>
            <div className='flex-1'>
              <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
              <div className='h-3 bg-gray-200 rounded w-3/4'></div>
            </div>
          </div>

          <div className='flex mb-4'>
            <div className='w-16 h-12 bg-blue-200 rounded mr-2'></div>
            <div className='flex-1'>
              <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
              <div className='h-3 bg-gray-200 rounded w-5/6 mb-1'></div>
              <div className='h-3 bg-gray-200 rounded w-4/6'></div>
            </div>
          </div>

          <div className='flex mb-auto'>
            <div className='w-12 h-12 bg-green-200 rounded-full mr-2'></div>
            <div className='flex-1'>
              <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
              <div className='h-3 bg-gray-200 rounded w-2/3'></div>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='flex-1 h-6 bg-purple-200 rounded-lg'></div>
            <div className='w-6 h-6 bg-yellow-400 rounded-md ml-2'></div>
          </div>
        </div>
      </div>

      <div className='absolute -right-4 bottom-10 w-24 h-32 bg-pink-100 rounded-lg transform rotate-12 shadow-md flex flex-col items-center justify-center p-2'>
        <div className='w-12 h-10 bg-pink-300 rounded-md mb-2'></div>
        <div className='w-16 h-3 bg-gray-300 mb-1'></div>
        <div className='w-12 h-3 bg-gray-200'></div>
      </div>

      <div className='absolute left-8 bottom-4 w-18 h-18 bg-yellow-100 rounded-full'></div>
    </div>
  )
}

export default HeroIllustration
