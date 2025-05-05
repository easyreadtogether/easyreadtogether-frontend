import { useContentStore } from '@/store/contentstore'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function TextInput () {
  const { originalText, setOriginalText } = useContentStore()

  const handleTextChange = e => {
    setOriginalText(e.target.value)
  }

  return (
    <div className='w-full'>
      <Label htmlFor='text-input' className='mb-2 block'>
        Or type your text here
      </Label>
      <Textarea
        id='text-input'
        placeholder='Enter the text you want to simplify...'
        value={originalText}
        onChange={handleTextChange}
        className='min-h-32 resize-y'
      />
    </div>
  )
}
