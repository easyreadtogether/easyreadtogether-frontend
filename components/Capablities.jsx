import React from 'react'
import { Link } from 'react-router-dom'

import {
  PiSealCheck,
  PiLeaf,
  PiGlobe,
  PiPackage,
  PiHandshake
} from 'react-icons/pi'
const Capablities = () => {
  return (
    <>
      <div className='flex flex-col justify-center w-full md:w-1/2'>
        <div className='mb-6'>
          <p className='text-accent font-bold mb-4'>Our Coffee Capabilities</p>
          <h2 className='text-3xl md:text-4xl font-bold text-primary mb-3 '>
            Premium Ethiopian Coffee Export Expertise
          </h2>
        </div>

        <p className='text-gray-700 mb-6'>
          ELEGANCE Coffee specializes in exporting the finest Ethiopian coffee
          varieties, including Yirgacheffe, Sidamo, and Harar. With direct
          partnerships with local growers, we ensure traceability and maintain
          the highest quality standards from farm to export.
        </p>

        <div className='mb-8'>
          <CoffeeCapabilitiesList />
        </div>

        <p className='text-gray-700 mb-8'>
          Our sustainable practices and rigorous quality control processes
          guarantee that every shipment meets international standards while
          supporting Ethiopia's coffee-growing communities.
        </p>

        <div>
          <Link
            to='/company/capabilities'
            className='cta_btn bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 inline-block'
          >
            <span>Explore Full Capabilities</span>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className=' flex justify-end items-center rounded-xl w-full md:w-1/2 overflow-hidden'>
        <img
          src={'img.avif'}
          alt='Ethio Green Land team'
          className='rounded-xl object-contain  w-[400px] h-[500px]'
        />
      </div>
    </>
  )
}

const CoffeeCapabilitiesList = () => {
  const capabilities = [
    {
      icon: <PiPackage className='text-accent text-xl' />,
      title: 'Coffee Export',
      description:
        'Specialized in exporting G2-G5 graded Ethiopian coffee to global markets'
    },
    {
      icon: <PiSealCheck className='text-accent text-xl' />,
      title: 'Quality Assurance',
      description: 'Q-graded quality control and certification processes'
    },
    {
      icon: <PiLeaf className='text-accent text-xl' />,
      title: 'Sustainable Sourcing',
      description: 'Ethical partnerships with organic coffee growers'
    },
    {
      icon: <PiGlobe className='text-accent text-xl' />,
      title: 'Global Logistics',
      description: 'Efficient international shipping and distribution'
    },
    {
      icon: <PiHandshake className='text-accent text-xl' />,
      title: 'Farmer Relationships',
      description: 'Direct trade with Ethiopian coffee cooperatives'
    }
  ]

  return (
    <ul className='space-y-4 grid gap-5 md:grid-cols-2'>
      {capabilities.map((item, index) => (
        <li key={index} className='flex items-start gap-4'>
          <div className='bg-accent/10 p-2 rounded-full mt-1'>{item.icon}</div>
          <div className='flex  w-full'>
            <div className='col-span-1'>
              <h5 className='font-semibold text-primary'>{item.title}</h5>
              <p className='text-gray-700'>{item.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Capablities
