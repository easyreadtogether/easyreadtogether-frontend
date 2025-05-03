import React from 'react'

const TestimonialCard = ({ quote, name, position }) => {
  return (
    <div className='bg-white p-6 rounded-md transition-shadow'>
      <div className='flex items-center mb-4'>
        <div className='text-accent text-2xl mr-2'>"</div>
        <p className='text-gray-700 italic'>{quote}</p>
      </div>
      <div className='flex items-center'>
        <div className='bg-primary/10 p-2 rounded-full mr-3'>
          <svg
            className='h-6 w-6 text-primary'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
        </div>
        <div>
          <h4 className='font-medium text-primary'>{name}</h4>
          <p className='text-sm text-gray-600'>{position}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'Elegance Coffee consistently provides exceptional Ethiopian beans with traceable origins. Their attention to quality is unmatched.',
      name: 'Michael Rodriguez',
      position: 'Roastery Manager, Berlin'
    },
    {
      quote:
        'Working with Elegance has allowed us to source directly from farmers while ensuring fair compensation. Their transparency is refreshing.',
      name: 'Sarah Chen',
      position: 'Coffee Buyer, Singapore'
    },
    {
      quote:
        'The Yirgacheffe we sourced from Elegance won us a national award. Their quality control is exceptional.',
      name: 'James Okafor',
      position: 'Head Roaster, Nairobi'
    }
  ]

  return (
    <section className='py-12 px-4 '>
      <div className='max-w-7xl mx-auto'>
        <p className='text-accent font-bold w-full text-center mb-2'>
          Our Testimonials
        </p>
        <h2 className='text-3xl font-bold text-primary mb-12 text-center'>
          What Our Partners Say
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              position={testimonial.position}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
