import React from 'react'
import HeroIllustration from '@/components/HeroIllustration'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { TestimonialCarousel } from '@/components/Testimonal'
import { TrustBadges } from '@/components/TrustBadges'
const FeatureSection = ({ image, title, description, reverse = false }) => {
  return (
    <section
      className={` py-16 md:p-16 ${
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
            className='w-full max-h-[400px] object-contain max-w-md mx-auto rounded-lg'
          />
        </div>
        <div className='md:w-1/2'>
          {title && (
            <h2 className='text-3xl font-bold text-primary mb-4'>{title}</h2>
          )}
          {description.map((d, index) => (
            <p
              key={index}
              className='text-lg mb-5 text-gray-700 dark:text-white/70'
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  const features = [
    {
      image: '/flow-diagram.png',
      title: 'How it Works: AI Meets Accessibility',
      description: [
        'EasyReadTogether uses Meta’s Llama 3 to simplify text and a finetuned translation model for supporting Swahili, ensuring accuracy and cultural relevance',
        'Behind the scenes: Secure AWS infrastructure, WCAG-compliant UI, and real-time image pairing and voice generation.'
      ]
    },
    {
      image: '/img_1.jpg',
      title: 'Built by the community, for the community',
      description: [
        'We didn’t build EasyReadTogether alone. Advocates, caregivers, and users with disabilities shaped every feature – from font size to Swahili translation choice, to voice support'
      ],
      reverse: true
    },
    {
      image: '/img_2.gif',
      description: [
        'Meet Nicholas Ndung’u, a social media influencer with dyslexia and neurodivergent advocate for autism: ‘Most accessibility tools aren’t tested with PWDs who need them most, it’s an amazing opportunity working alongside EasyReadTogether to ensure the tool works for us. As a dyslexic, I am particularly excited about the voice feature..'
      ]
    },
    {
      image: '/img_3.jpg',
      title: 'Join the movement for Inclusive Information',
      description: [
        'Try EasyReadTogether now and see the difference – or partner with us to scale access across Africa and other underserved regions.”.'
      ],
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

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl p-10 mx-auto'>
        {/* Public Agencies Card */}
        <Card className='border-foreground/10  transition-colors'>
          <CardHeader>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-4 h-4 rounded-full ' />
              <CardTitle>For Public Agencies</CardTitle>
            </div>
            <CardDescription className='text-base'>
              Convert your content into Easy Read formats—fast, multilingual,
              and aligned with your mandates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex gap-2'>
              <span className='px-3 py-1 text-xs rounded-full -'>
                Fast Conversion
              </span>
              <span className='px-3 py-1 text-xs rounded-full  '>
                Multilingual
              </span>
              <span className='px-3 py-1 text-xs rounded-full 0 '>
                Compliant
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Advocates & Educators Card */}
        <Card className='border-foreground/10  transition-colors'>
          <CardHeader>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-4 h-4 rounded-full bg-purple-' />
              <CardTitle>For Advocates & Educators</CardTitle>
            </div>
            <CardDescription className='text-base'>
              Co-curate content, add your language or domain, and help guide
              inclusive design.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex gap-2 flex-wrap'>
              <span className='px-3 py-1 text-xs rounded-full '>
                Collaboration
              </span>
              <span className='px-3 py-1 text-xs rounded-full '>
                Localization
              </span>
              <span className='px-3 py-1 text-xs rounded-full '>
                Inclusive Design
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <TestimonialCarousel />
      <TrustBadges />
      {/* Call to Action Section */}
      {/* <section className='py-20 bg-primary dark:bg-background text-white text-center'>
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
      </section> */}
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
