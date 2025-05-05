import React from 'react'
import HeroIllustration from '@/components/HeroIllustration'
const Home = () => {
  return (
    <div className='container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)]'>
      <section className='container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in'>
          Make Any Document Easy to Understand!
        </h1>

        <p className='text-lg md:text-xl  max-w-3xl mb-12'>
          Upload complex files like PDFs or DOCs and get a simplified version
          with images and short texts, designed for kids and people with autism.
        </p>

        <div className='w-full max-w-4xl mb-16'>
          <HeroIllustration />
        </div>
      </section>
    </div>
  )
}

export default Home
