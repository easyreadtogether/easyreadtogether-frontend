import React, { useState } from 'react'

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqs = [
    {
      question: 'What types of elevators do you provide?',
      answer:
        'We specialize in providing a wide range of elevator systems including passenger elevators, freight elevators, home elevators, and hospital elevators. Our products are customizable to meet various building requirements and safety standards.'
    },
    {
      question: 'What minerals do you export?',
      answer:
        'We export high-quality minerals including copper ore, lithium, tantalum, and various precious stones. Our mining operations adhere to strict quality control measures and international standards.'
    },
    {
      question: 'Do you provide installation services?',
      answer:
        'Yes, we offer complete installation services for all our elevator systems. Our certified technicians ensure proper installation, testing, and commissioning of all equipment.'
    },
    {
      question: 'What regions do you operate in?',
      answer:
        'We operate throughout Ethiopia with our headquarters in Addis Ababa. Through our sister companies, we also have operations in Djibouti and Somaliland, serving clients across the Horn of Africa.'
    },
    {
      question: 'What maintenance services do you offer?',
      answer:
        'We provide comprehensive maintenance packages including regular inspections, preventive maintenance, 24/7 emergency services, and modernization of existing elevator systems.'
    },
    {
      question: 'How can I request a quote?',
      answer:
        'You can request a quote by contacting our sales team directly via phone or email, or by filling out the inquiry form on our website. We typically respond within 24 hours with detailed pricing information.'
    }
  ]

  return (
    <section className='max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center'>
      <p className='text-accent font-bold mb-2'>Faq's</p>

      <h2 className='text-3xl font-bold text-primary mb-12 text-center'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300'
          >
            <button
              className={`w-full flex justify-between items-center p-6 text-left focus:outline-none ${
                activeIndex === index ? 'bg-primary/5' : 'bg-white'
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <h3 className='text-lg md:text-xl font-semibold text-primary'>
                {faq.question}
              </h3>
              <svg
                className={`w-6 h-6 text-accent transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
            <div
              className={`px-6 pb-6 pt-0 transition-all duration-300 ${
                activeIndex === index
                  ? 'opacity-100 max-h-[500px]'
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              <p className='text-gray-700'>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Faq
