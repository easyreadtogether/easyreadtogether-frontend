import React, { useState, useEffect } from 'react'

const Hero = () => {
  const slides = [
    {
      image: '/images/farm_1.jpeg',
      title: 'Premium Ethiopian Coffee Exporters',
      description: `Elegance Coffee, a division of ELEGAS Ethiopia Trading PLC, specializes in exporting premium Ethiopian coffee grades including G2, G3, G4 and G5. We combine traditional cultivation methods with rigorous quality control to deliver exceptional coffee experiences globally while maintaining sustainable and ethical production practices.`,
      cta: 'Explore Our Coffee',
      link: '/products'
    },
    {
      image: '/images/img_6.jpeg',
      title: 'Strategic Global Partnerships',
      description: 'Leveraging the Elegance Group\'s international trade networks, we cultivate long-term collaborations with growers, distributors, and retailers worldwide. Our partnerships benefit from established logistics channels through Elegance General Trading SARL in Djibouti.',
      cta: 'Become a Partner',
      link: '/partnership'
    },
    {
      image: '/images/beans.jpeg',
      title: 'Sustainable Farming Practices',
      description: 'Committed to sustainable and ethical coffee production that benefits local communities and the environment. We partner with farms that practice organic cultivation and fair labor standards across Ethiopia\'s premier coffee-growing regions.',
      cta: 'Our Sustainability',
      link: '/sustainability'
    },
    {
      image: '/images/farm_2.jpg', // You'll need to add this image
      title: 'Quality Assurance Excellence',
      description: 'Our team of certified Q-graders implements rigorous quality control measures ensuring all exports meet Ethiopian quality standards. We maintain traceability from farm to cup through our integrated supply chain management.',
      cta: 'Quality Process',
      link: '/quality'
    },
    {
      image: '/images/store.jpeg', // You'll need to add this image
      title: 'Global Distribution Network',
      description: 'Through the Elegance Group\'s capabilities, we efficiently distribute to 25+ countries worldwide. Our logistics partners guarantee optimal conditions throughout the supply chain from Ethiopian highlands to international markets.',
      cta: 'Our Global Reach',
      link: '/distribution'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0)
  const [fade, setFade] = useState(true)

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))
        setFade(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setFade(false)
    setTimeout(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))
      setFade(true)
    }, 500)
  }

  const prevSlide = () => {
    setFade(false)
    setTimeout(() => {
      setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))
      setFade(true)
    }, 500)
  }

  return (
    <div className='relative h-[700px] md:h-[800px] w-full overflow-hidden'>
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </div>

      {/* Content */}
      <div className='relative h-full flex flex-col justify-center items-center text-center px-4'>
        <div
          className={`max-w-6xl flex flex-col items-center mx-auto text-white transition-all duration-500 ${
            fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className='text-4xl md:text-6xl text-white font-bold mb-6 font-serif'>
            {slides[currentSlide].title}
          </h1>
          <p className='text-xl md:text-[20px] mb-8 text-white max-w-2xl mx-auto'>
            {slides[currentSlide].description}
          </p>
          <button className='cta_btn'>{slides[currentSlide].cta}</button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-colors duration-300 z-10'
        aria-label='Previous slide'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-colors duration-300 z-10'
        aria-label='Next slide'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setFade(false)
              setTimeout(() => {
                setCurrentSlide(index)
                setFade(true)
              }, 500)
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-amber-500' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
