import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    quote:
      'Finally, a tool that can allow me to access information in both English and Swahili at a click',
    author: 'Maryanne, disability advocate'
  },
  {
    quote: 'The voice output feature is what I was waiting for',
    author: 'Nicholas, autism advocate'
  },
  {
    quote:
      'I hope the character limit can be increased to help our training centre simplify a batch of publications',
    author: 'Miriam, Ubongo Learning - edutainment NGO'
  }
]

export function TestimonialCarousel () {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <div className='w-full max-w-xl flex flex-col items-center justify-center gap-5 my-16 mx-auto'>
      <Card className='bg-white  dark:bg-background shadow-sm'>
        <CardContent className='p-8'>
          <div className='min-h-[100px] flex items-center'>
            <blockquote className='text-lg italic text-foreground'>
              "{testimonials[currentIndex].quote}"
            </blockquote>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between items-center border-t px-6 py-4'>
          <p className='text-sm text-foreground'>
            — {testimonials[currentIndex].author}
          </p>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={prevTestimonial}
              className='border-gray-300'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={nextTestimonial}
              className='border-gray-300'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className='flex justify-center mt-4 gap-2'>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-gray-900' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
