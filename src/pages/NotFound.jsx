import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { RocketIcon } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='flex flex-col  mx-auto items-center justify-start   text-foreground p-4'>
      <div className='max-w-md text-center space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-9xl font-bold text-primary'>404</h1>
          <h2 className='text-3xl font-bold'>Page Not Found</h2>
          <p className='text-muted-foreground'>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild variant='default'>
            <Link to='/' className='flex items-center gap-2'>
              <RocketIcon className='h-4 w-4' />
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
