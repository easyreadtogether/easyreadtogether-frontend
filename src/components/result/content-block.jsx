import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

// interface ContentBlockProps {
//   content: SimplifiedContent;
//   fontSize: FontSize;
//   contentLayout: ContentLayout;
// }

const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg'
}

export function ContentBlock ({ content, fontSize, contentLayout }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [content.image_url])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const getContentClasses = () => {
    switch (contentLayout) {
      case 'image-left':
        return 'md:flex-row'
      case 'image-right':
        return 'md:flex-row-reverse'
      case 'image-top':
        return 'flex-col'
      default:
        return 'md:flex-row'
    }
  }

  return (
    <div
      className={cn(
        'flex  gap-6 border items-center  rounded-lg  text-card-foreground',
        getContentClasses()
      )}
      style={{ pageBreakInside: 'avoid' }}
    >
      {!imageError && (
        <div
          className={cn(
            'relative overflow-hidden rounded-md flex-shrink-0',
            contentLayout === 'image-top'
              ? 'w-full h-48 md:h-auto'
              : 'w-full md:w-1/3 h-auto'
          )}
        >
          {!imageLoaded && (
            <div className='absolute inset-0 flex items-center justify-center bg-muted animate-pulse'>
              <span className='text-muted-foreground'>Loading...</span>
            </div>
          )}
          <img
            src={content.image_url}
            alt='Content visualization'
            className={cn(
              'object-contain  w-aito mx-auto max-h-[300px] transition-opacity',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
      )}

      <div
        className={cn(
          'prose dark:prose-invert max-w-none flex items-start justify-center flex-col p-5  h-full',
          fontSizeClasses[fontSize],
          contentLayout === 'image-top' ? 'w-full' : 'flex-grow'
        )}
      >
        <div className=' md-container prose max-w-none h-full overflow-y-auto p-4'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content.text_markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
