import { Upload, X, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContentStore } from '@/store/contentstore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function FileUpload () {
  const { file, setFile, language, setLanguage } = useContentStore()

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  const handleLanguageChange = value => {
    setLanguage(value)
  }

  const fileInputId = 'file-upload'

  return (
    <div className='w-full flex  gap-5 flex-row-reverse items-center space-y-4'>
      {/* Language Selector - Always visible */}
      <div className='flex flex-col items-start space-x-2'>
        <span className='text-xs mb-2'>Select Language</span>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='English'>English</SelectItem>
            <SelectItem value='Swahili'>Swahili</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex-1'>
        {/* File Upload Section */}
        {!file ? (
          <div className=' rounded-lg text-start flex-1  '>
            <div>
              <Button
                type='button'
                variant='outline'
                onClick={() => document.getElementById(fileInputId)?.click()}
                className={'flex flex-row items-center'}
              >
                Browse files{' '}
                <Upload className='h-10 w-10 mx-auto text-muted-foreground' />
              </Button>
              <p className='text-xs mt-2 text-muted-foreground mb-4'>
                Supported formats: PDF, DOC, DOCX
              </p>
            </div>
            <input
              id={fileInputId}
              type='file'
              multiple
              accept='.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              className='hidden'
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className='border rounded-lg p-4 flex items-center justify-between'>
            <div className='flex items-center'>
              <FileText className='h-8 w-8 mr-3 text-primary' />
              <div>
                <p className='font-medium'>{file.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <Button
              variant='ghost'
              size='icon'
              onClick={removeFile}
              className='text-muted-foreground'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
