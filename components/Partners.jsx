import React from 'react'
const Partners = () => {
  const partners_logo = [
    'partners/daye-bensa.png',
    'partners/zelalem.png',
    'partners/elegance_eng.jpeg',
    'partners/elegance_general.png',
    'partners/yirga.jpeg',
    'partners/otf.png',
    'partners/kor.png',
  ]
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-accent font-bold mb-4'>Our Partners</p>
      <h2 className='text-3xl md:text-4xl font-bold text-primary mb-3 '>
        Our Clients & Partners
      </h2>
      <div className='flex mt-10 flex-row flex-wrap items-center justify-center h-auto gap-7 md:gap-10 mb-16'>
        {partners_logo.map((logo, index) => {
          return (
            <img
              key={index}
              src={logo}
              alt={`${logo} logo`}
              className='h-[70px] md:h-[100px] w-auto object-contain'
            />
          )
        })}
      </div>
    </div>
  )
}

export default Partners
