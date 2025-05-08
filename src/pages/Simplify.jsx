import { useNavigate } from 'react-router-dom'
import { FileUpload } from '@/components/simplify/file-upload'
import { TextInput } from '@/components/simplify/text-input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useContentStore } from '@/store/contentstore'
import axios from 'axios'
import { useState } from 'react'
function Simplify () {
  const { originalText, file, setSimplifiedContent, clearContent, language } =
    useContentStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!originalText && !file) {
        return
      }

      const formData = new FormData()

      // Add text content if available
      if (originalText) {
        formData.append('text', originalText)
      }

      // Add file if available
      // if (file) {
      //   formData.append('file', file)
      // }

      // Add language preference
      formData.append('lang', language)
      console.log(language)
      console.log(originalText)

      const response = await axios.post(
        'https://easyreadtogether-backend-app.com/api/simplify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      // Handle the response (store it in your content store)
      setSimplifiedContent(response.data)
      navigate('/result')
    } catch (err) {
      setError('Unexpected error happned, Proccessing failed!')
      console.error('Error simplifying content:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    clearContent()
  }

  const handleMockSimplify = async () => {
    navigate('/result')
  }

  return (
    <div className='container mx-auto my-8 px-4 max-w-5xl'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <h1 className='!text-3xl font-bold tracking-tight'>
            Simplify your content
          </h1>
          <p className='text-muted-foreground'>
            Upload a document or paste text to have it simplified and visualized
            and read aloud.
          </p>
        </div>

        <Separator className='my-6' />

        <TextInput />

        <FileUpload />

        {error && (
          <div className='p-3 text-sm text-white bg-destructive rounded-md'>
            {error}
          </div>
        )}

        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !originalText}>
            {loading ? 'Processing...' : 'Simplify'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Simplify
