import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ContentBlock } from '@/components/result/content-block'
import { FontSizeSelector } from '@/components/result/font-size-selector'
import { LayoutSelector } from '@/components/result/layout-selector'
import { useContentStore } from '@/store/contentstore'
import { downloadAsPdf } from '@/lib/pdf'

function Result () {
  const { simplifiedContent, fontSize, contentLayout } = useContentStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (simplifiedContent.length === 0) {
      navigate('/simplify')
    }
  }, [simplifiedContent, navigate])

  const handleBack = () => {
    navigate('/simplify')
  }

  const handleDownload = async () => {
    try {
      await downloadAsPdf(simplifiedContent, fontSize, contentLayout)
    } catch (error) {}
  }

  if (simplifiedContent.length === 0) {
    return null
  }

  return (
    <div className='container mx-auto my-8 max-w-5xl'>
      <div className='flex flex-col space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h1 className='!text-3xl font-bold tracking-tight'>
              Simplified Content
            </h1>
            <p className='text-muted-foreground'>
              Your content has been simplified and visualized.
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <FontSizeSelector />
            <LayoutSelector />
            <Button onClick={handleDownload} className='gap-2'>
              <Download className='h-4 w-4' />
              <span>Download</span>
            </Button>
          </div>
        </div>

        <Separator className='my-2' />

        <div className='space-y-8'>
          {simplifiedContent.map((content, index) => (
            <ContentBlock
              key={index}
              content={content}
              fontSize={fontSize}
              contentLayout={contentLayout}
            />
          ))}
        </div>

        <Button
          variant='outline'
          className='self-start gap-2'
          onClick={handleBack}
        >
          <ArrowLeft className='h-4 w-4' />
          <span>Back to Simplify</span>
        </Button>
      </div>
    </div>
  )
}

export default Result
