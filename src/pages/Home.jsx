import React from 'react'
import HeroIllustration from '@/components/HeroIllustration'
import { Link } from 'react-router-dom'

const FeatureSection = ({ image, title, description, reverse = false }) => {
  return (
    <section
      className={`py-16 ${
        reverse ? 'bg-gray-50 dark:bg-white/5 dark:text-white' : ''
      }`}
    >
      <div
        className={`container mx-auto px-4 flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-12`}
      >
        <div className='md:w-1/2'>
          <img
            src={image}
            alt={title}
            className='w-full h-auto max-w-md mx-auto rounded-lg'
          />
        </div>
        <div className='md:w-1/2'>
          <h2 className='text-3xl font-bold text-primary mb-4'>{title}</h2>
          <p className='text-lg text-gray-700 dark:text-white/70'>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  const features = [
    {
      image: '/education.png',
      title: 'Simplified Learning',
      description:
        'Our AI-powered platform breaks down complex educational materials into easy-to-understand formats with visual aids and audio support, making learning accessible to all.'
    },
    {
      image: '/knowledge.png',
      title: 'Knowledge for Everyone',
      description:
        'We transform dense information into clear, simple content while preserving the original meaning. No more struggling with complicated texts - knowledge should be universally accessible.',
      reverse: true
    },
    {
      image: '/working.png',
      title: 'Workplace Inclusion',
      description:
        'Help your team understand important documents and policies with our simplified versions. Perfect for training materials, HR documents, and company communications.'
    },
    {
      image: '/reading.png',
      title: 'Enjoy Reading Again',
      description:
        'Rediscover the joy of reading with content tailored to your comprehension level. Our technology helps bridge literacy gaps for better understanding.',
      reverse: true
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className='container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)]'>
        <section className='container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in'>
            Reading Made Simple, for everyone, everywhere
          </h1>

          <p className='text-lg md:text-xl max-w-3xl mb-12 text-gray-700 dark:text-white/70'>
            Transforming complex text into simple, visual-rich content – and
            listen to it read aloud. Powered by inclusive AI, we deliver clarity
            in Swahili, English, and beyond, because understanding should be
            seen, heard, and accessible to all.
          </p>

          <div className='w-full max-w-4xl mb-16'>
            <HeroIllustration />
          </div>
        </section>
      </div>

      {/* Feature Sections */}
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          image={feature.image}
          title={feature.title}
          description={feature.description}
          reverse={feature.reverse}
        />
      ))}

      {/* Call to Action Section */}
      <section className='py-20 bg-primary dark:bg-background text-white text-center'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Experience Simpler Reading?
          </h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto dark:text-white/70'>
            Join thousands of users who are already benefiting from our content
            simplification platform.
          </p>
          <Link
            to='/simplify'
            className='bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors'
          >
            Get Started Now
          </Link>
        </div>
      </section>
      <footer className='p-10'>
        <div className='flex items-center justify-center gap-2'>
          <img src='/logo.png' alt='fenix logo' className='h-35 w-35' />
        </div>
        <div className='w-full h-1 bg-black/5 my-10' />
        <div className='text-center text-sm text-gray-500 pb-4'>
          © {new Date().getFullYear()} Fenix. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
