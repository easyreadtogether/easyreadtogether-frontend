import { useEffect, useRef, useState } from 'react'
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
import axios from 'axios'

function Result () {
  const { simplifiedContent, fontSize, contentLayout, originalText } =
    useContentStore()
  const navigate = useNavigate()
  const resultRef = useRef(null)
  const [audioLoading, setAudioLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)

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
      // Clone the content to avoid modifying the displayed DOM
      const element = resultRef.current.cloneNode(true)

      // Create a container div to hold all content
      const container = document.createElement('div')
      container.style.width = '100%'
      container.style.padding = '20px'
      container.appendChild(element)

      // Apply styling for PDF generation
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
         h1, h2, h3{
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
        .audio-player {
          display: none !important;
        }
        .content-block {
          page-break-inside: avoid !important;
        }
      `
      container.appendChild(styleElement)

      // Configure PDF options with improved page break handling
      const opt = {
        margin: [10, 10, 10, 10], // top, right, bottom, left
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

      // Generate and save PDF
      await html2pdf().set(opt).from(container).save()
    } catch (error) {
      console.error('Failed to generate PDF', error)
    }
  }

  const handleDownloadAudio = async () => {
    // Combine all text_markdown into a single string
    const combinedText = simplifiedContent
      .map(content => content.text_markdown)
      .join(' ') // Join with spaces for natural speech flow
    setAudioLoading(true)

    try {
      const formData = new FormData()
      formData.append('text', combinedText)
      formData.append('language', 'English') // Assuming English as default

      const response = await axios.post(
        'http://18.218.138.236:8000/api/listen',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob' // Important for receiving binary data
        }
      )

      // Create a URL for the audio blob
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    } catch (err) {
      console.error('Error generating audio:', err)
      // Handle error (show toast, etc.)
    } finally {
      setAudioLoading(false)
    }
  }

  useEffect(() => {
    handleDownloadAudio()
  }, [])

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
            <span className='text-black text-xs text-bold'>
              Press Play to listen.{' '}
            </span>
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
        <div className='border flex items-center justify-center p-5 rounded-lg border-black/20'>
          {audioLoading ? (
            <div>
              <div className='flex items-center justify-center'>
                <div className='w-6 h-6 border-4 border-black mb-3 border-dashed rounded-full animate-spin'></div>
              </div>

              <p>Generating audio...</p>
            </div>
          ) : audioUrl ? (
            <Player className='audio-player' audioUrl={audioUrl} />
          ) : (
            <p>Audio not available</p>
          )}
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
            <div key={index}>
              <ContentBlock
                content={content}
                fontSize={fontSize}
                contentLayout={contentLayout}
              />
              {(index + 1) % 4 === 0 && <div className='page-break-after' />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Usage
export default Result
