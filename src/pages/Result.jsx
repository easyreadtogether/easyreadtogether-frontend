import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ArrowLeft, AlertCircle } from 'lucide-react'
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
  const { simplifiedContent, fontSize, contentLayout, language, clearContent } =
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
      // Show loading state

      // Clone the content to avoid modifying the original DOM
      const element = resultRef.current.cloneNode(true)
      const container = document.createElement('div')
      container.style.width = '100%'
      container.style.padding = '20px'
      container.appendChild(element)

      // Replace all image sources with CORS-friendly versions
      const images = container.querySelectorAll('img')
      await Promise.all(
        Array.from(images).map(async img => {
          try {
            // Add cache busting parameter and force CORS
            const originalSrc = img.src
            if (originalSrc.includes('s3.amazonaws.com')) {
              img.src = await getProxiedImageUrl(originalSrc)
            }
            img.crossOrigin = 'anonymous'

            // Wait for image to load or fail
            await new Promise(resolve => {
              img.onload = resolve
              img.onerror = resolve // Continue even if image fails
            })
          } catch (error) {
            console.warn('Error processing image:', img.src, error)
            // Fallback to original src if proxy fails
            img.src = img.dataset.originalSrc || img.src
          }
        })
      )

      // PDF styling
      const styleElement = document.createElement('style')
      styleElement.textContent = `
        * {
          color: #000000 !important;
          background-color: #ffffff !important;
        }
        .card {
          margin-bottom: 15px !important;
          page-break-inside: avoid !important;
        }
        img {
          max-width: 100% !important;
          max-height: 400px !important;
          page-break-inside: avoid !important;
          object-fit: contain !important;
        }
        .prose {
          font-size: ${fontSize}px !important;
        }
        h1, h2, h3 {
          page-break-after: avoid !important;
          margin-bottom: 1rem !important;
        }
        .page-break {
          page-break-after: always !important;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `
      container.appendChild(styleElement)

      // PDF configuration
      const opt = {
        margin: [10, 10],
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          letterRendering: true,
          async: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css'],
          avoid: ['img', '.card', 'h1', 'h2', 'h3']
        }
      }

      // Generate PDF
      await html2pdf().set(opt).from(container).save()
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert(
        'Failed to generate PDF. Please try again or check console for details.'
      )
    } finally {
    }
  }

  // Helper function to proxy S3 images
  async function getProxiedImageUrl (originalUrl) {
    try {
      // Option 3: Data URL conversion (for small images)
      return await convertToDataURL(originalUrl)
    } catch (error) {
      console.warn('Proxy failed, using original URL:', error)
      return originalUrl
    }
  }

  // Optional: Convert image to data URL
  async function convertToDataURL (url) {
    try {
      const response = await fetch(url, { mode: 'cors' })
      if (!response.ok) throw new Error('Network response was not ok')
      const blob = await response.blob()
      return await new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => resolve(url) // Fallback to original URL
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.warn('Data URL conversion failed:', error)
      return url
    }
  }

  const handleDownloadAudio = async () => {
    // Combine all text_markdown into a single string
    const combinedText = simplifiedContent
      .map(content => content.content)
      .join(' ') // Join with spaces for natural speech flow
    setAudioLoading(true)

    try {
      const formData = new FormData()
      formData.append('text', combinedText)
      formData.append('language', 'English')

      const response = await axios.post(
        'https://easyreadtogether-backend-app.com/api/listen',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType: 'blob'
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
            <span className='text-black dark:text-white text-xs text-bold'>
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
        {language === 'English' ? (
          <div className='border flex items-center justify-center p-5 rounded-lg border-black/10'>
            {audioLoading ? (
              <div>
                <div className='flex items-center justify-center'>
                  <div className='w-6 h-6 border-4 border-black dark:border-white mb-3 border-dashed rounded-full animate-spin'></div>
                </div>

                <p>Generating audio...</p>
              </div>
            ) : audioUrl ? (
              <Player className='audio-player' audioUrl={audioUrl} />
            ) : (
              <p>Audio not available</p>
            )}
          </div>
        ) : (
          <div className='border mt-2 dark:border-foreground/10 gap-3 flex items-center justify-center p-5 rounded-lg border-black/10'>
            <AlertCircle className='text-orange-400/80' />{' '}
            <p>Audio generation is supported forn English</p>
          </div>
        )}
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
