import React from 'react'
import { Link } from 'react-router-dom'
import { PiArrowRightLight } from 'react-icons/pi'
const NewsComponent = ({ news }) => {
  return (
    <div key={news.id} className='bg-white shadow-sm overflow-hidden rounded-md'>
      <img
        src={`https://api.elegancoffee.com/${news?.featured_image?.image_url}`}
        alt={news.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-[var(--color-accent)]'>
            {new Date(news.created_at).toLocaleDateString()}
          </span>
        </div>
        <h3 className='text-xl font-semibold mb-3 text-[var(--color-primary)]'>
          {news.title}
        </h3>
        <p className='text-[var(--color-primary)] mb-4 line-clamp-3'>
          {news.description}
        </p>
        <Link
          state={{
            news: news
          }}
          className='flex items-center font-bold pb-1 w-max self-start gap-4 text-accent hover:border-b-accent border-b border-b-transparent'
          to={`/news/${news.slug}`}
        >
          <span>Read Full News </span>
          <PiArrowRightLight />
        </Link>
      </div>
    </div>
  )
}

export default NewsComponent
