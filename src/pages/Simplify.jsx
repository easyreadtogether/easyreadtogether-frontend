import { useNavigate } from 'react-router-dom'
import { FileUpload } from '@/components/simplify/file-upload'
import { TextInput } from '@/components/simplify/text-input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useContentStore } from '@/store/contentstore'

function Simplify () {
  const { originalText, file, simplifyContent, loading, error, clearContent } =
    useContentStore()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      if (!originalText && !file) {
        return
      }

      await simplifyContent()
      navigate('/result')
    } catch (err) {
      // Error is handled by the store
    }
  }

  const handleClear = () => {
    clearContent()
  }

  return (
    <div className='container mx-auto my-8 px-4 max-w-5xl'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Simplify your content
          </h1>
          <p className='text-muted-foreground'>
            Upload a document or paste text to have it simplified and
            visualized.
          </p>
        </div>

        <Separator className='my-6' />

        <Tabs defaultValue='upload' className='w-full'>
          <TabsList className='grid grid-cols-2 w-full '>
            <TabsTrigger value='upload'>Upload</TabsTrigger>
            <TabsTrigger value='text'>Text</TabsTrigger>
          </TabsList>

          <TabsContent value='upload' className='mt-6 space-y-4'>
            <FileUpload />
          </TabsContent>

          <TabsContent value='text' className='mt-6 space-y-4'>
            <TextInput />
          </TabsContent>
        </Tabs>

        {error && (
          <div className='p-3 text-sm text-white bg-destructive rounded-md'>
            {error}
          </div>
        )}

        <div className='flex justify-end gap-4 mt-8'>
          <Button variant='outline' onClick={handleClear}>
            Clear
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || (!originalText && !file)}
          >
            {loading ? 'Processing...' : 'Simplify'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Simplify
