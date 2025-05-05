import { create } from 'zustand'

// interface ContentState {
//   originalText: string;
//   file: File | null;
//   language: Language;
//   simplifiedContent: SimplifiedContent[];
//   fontSize: FontSize;
//   contentLayout: ContentLayout;
//   loading: boolean;
//   error: string | null;
//   setOriginalText: (text: string) => void;
//   setFile: (file: File | null) => void;
//   setLanguage: (language: Language) => void;
//   simplifyContent: () => Promise<void>;
//   setFontSize: (size: FontSize) => void;
//   setContentLayout: (layout: ContentLayout) => void;
//   clearContent: () => void;
// }

export const useContentStore = create((set, get) => ({
  originalText: '',
  file: null,
  language: 'en',
  simplifiedContent: [],
  fontSize: 'medium',
  contentLayout: 'image-right',
  loading: false,
  error: null,

  setOriginalText: text => set({ originalText: text }),
  setFile: file => set({ file }),
  setLanguage: language => set({ language }),

  simplifyContent: async () => {
    const { originalText, file, language } = get()

    // Check if we have content to simplify
    if (!originalText && !file) {
      set({ error: 'Please provide text or upload a file' })
      return
    }

    set({ loading: true, error: null })

    try {
      // Simulate API call - in a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock API response
const mockResponse = [
  {
    text_markdown:
      '## Page 1: The Curious Dog and the Chatty Parrot\n\nOnce upon a time, in a sunny village, lived a curious dog named **Buddy**. He loved sniffing flowers and chasing butterflies.\n\nOne day, he heard a funny voice from a tree. "Hello! Hello!" it said. Buddy barked, Who\'s there? \n\nIt was a **parrot** named **Polly**!',
    image_url:
      'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown:
      '## Page 2: A New Friendship\n\nBuddy wagged his tail. He had never seen such a colorful bird. Polly flew down and said, "Let’s be friends!"\n\nBuddy barked with joy. "Do you want to play fetch?"\n\nPolly laughed, "I’ll watch and cheer!" And so they played happily.',
    image_url:
      'https://images.pexels.com/photos/853382/pexels-photo-853382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown:
      '## Page 3: Trouble in the Garden\n\nSuddenly, they heard a loud meow! A sneaky **cat** was hiding in the bushes, eyeing Polly.\n\n"Buddy!" Polly squawked. "Help me!"\n\nBuddy barked loudly and chased the cat away. Polly was safe!',
    image_url:
      'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown:
      '## Page 4: Heroes Together\n\nPolly gave Buddy a feather. "You’re my hero!" she said.\n\nFrom that day on, they became the best of friends. They explored the garden, shared snacks, and told silly stories.\n\nEvery day was an adventure for Buddy and Polly.',
    image_url:
      'https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown:
      '## The End: What We Learned\n\n* Be kind to new friends\n* Help each other in trouble\n* Enjoy nature and play together\n\n**Buddy and Polly** showed that even a dog and a bird can be best friends!',
    image_url:
      'https://images.pexels.com/photos/1485639/pexels-photo-1485639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];


      set({
        simplifiedContent: mockResponse,
        loading: false
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false
      })
    }
  },

  setFontSize: fontSize => set({ fontSize }),
  setContentLayout: contentLayout => set({ contentLayout }),
  clearContent: () =>
    set({
      originalText: '',
      file: null,
      simplifiedContent: [],
      error: null
    })
}))
