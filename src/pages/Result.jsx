import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ContentBlock } from '@/components/result/content-block'
import { FontSizeSelector } from '@/components/result/font-size-selector'
import { LayoutSelector } from '@/components/result/layout-selector'
import { useContentStore } from '@/store/contentstore'
import Player from '../components/result/player'
import html2pdf from 'html2pdf.js'

const audio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
function Result () {
  const { simplifiedContent, fontSize, contentLayout } = useContentStore()
  const navigate = useNavigate()
  const resultRef = useRef(null)

  useEffect(() => {
    if (simplifiedContent.length === 0) {
      navigate('/simplify')
    }
  }, [simplifiedContent, navigate])

  const handleBack = () => {
    navigate('/simplify')
  }

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return

    try {
      const element = resultRef.current.cloneNode(true)
      const container = document.createElement('div')
      container.style.width = '100%'
      container.style.padding = '20px'
      container.appendChild(element)

      const styleElement = document.createElement('style')
      styleElement.textContent = `
        * {
          color: #000000 !important;
          background-color: #ffffff !important;
          border-color: #ffffff !important;
        }
        .card {
          
          margin-bottom: 15px !important;
          page-break-inside: avoid !important;
        }
        img {
          max-width: 100% !important;
          max-height: 400px !important;
          page-break-inside: avoid !important;
        }
        .prose {
          font-size: ${fontSize}px !important;
        }
        h1, h2, h3 {
          height:auto !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          margin-bottom: 1.5rem !important;
        }
        p {
          word-wrap: break-word;
          overflow-wrap: break-word;
          margin-bottom: 0.3rem;
        }
        .content-block {
          page-break-inside: avoid !important;
        }
      `
      container.appendChild(styleElement)

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'simplified-content.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          removeContainer: true,
          allowTaint: true,
          letterRendering: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          hotfixes: ['px_scaling']
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: ['.avoid-break', 'img', '.content-block']
        }
      }

      await html2pdf().set(opt).from(container).save()
    } catch (error) {
      console.error('Failed to generate PDF', error)
    }
  }

  if (simplifiedContent.length === 0) {
    return null
  }

  return (
    <div className='container mx-auto my-8 max-w-5xl'>
      <div className='flex flex-col space-y-6 px-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h1 className='!text-xl font-bold tracking-tight'>
              Simplified Content
            </h1>
            <p className='text-muted-foreground'>
              Your content has been simplified and visualized.
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <FontSizeSelector />
            <LayoutSelector />
            <Button onClick={handleDownloadPDF} className='gap-2'>
              <Download className='h-4 w-4' />
              <span>Download</span>
            </Button>
          </div>
        </div>

        <Separator className='my-2' />
        <div className='border flex flex-col items-center justify-center p-5 rounded-lg border-black/20'>
          <Player content={simplifiedContent.map(c => c.content).join(' ')} />
        </div>
        <Separator className='my-2' />

        <Button
          variant='outline'
          className='self-start gap-2'
          onClick={handleBack}
        >
          <ArrowLeft className='h-4 w-4' />
          <span>Back to Simplify</span>
        </Button>
        <div className='space-y-8' ref={resultRef}>
          {simplifiedContent.map((content, index) => (
            <>
              <ContentBlock
                key={index}
                content={content}
                fontSize={fontSize}
                contentLayout={contentLayout}
              />
              {(index + 1) % 3 === 0 && <div className='page-break-after' />}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Result
