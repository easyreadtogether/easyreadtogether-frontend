export function TrustBadges () {
  return (
    <div className='flex flex-col dark:bg-white/5 items-center gap-6 py-10'>
      <h2 className=' font-medium text-foreground'>Proudly open source</h2>

      <div className='flex flex-wrap justify-center items-center gap-8'>
        {/* Meta AI Badge */}
        <div className='flex flex-col items-center gap-2'>
          <div className='bg-white  w-[100px] h-[80px] rounded-lg border border-gray-200'>
            <img
              src='/meta.jpg' // Replace with your actual image path
              alt='Meta AI'
              className=' object-cover w-full h-full'
            />
          </div>
          <span className='text-xs'>Llama</span>
        </div>

        {/* DPG Badge */}
        <div className='flex flex-col items-center gap-2'>
          <div className='bg-white  w-[100px] p-3 h-[80px] rounded-lg border border-gray-200'>
            <img
              src='/dpg.png' // Replace with your actual image path
              alt='Digital Public Goods'
              className=' object-cover w-full h-full'
            />
          </div>
          <span className='text-xs'>Digital Public Goods</span>
        </div>
      </div>
    </div>
  )
}
