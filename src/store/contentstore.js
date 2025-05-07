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
    text_markdown: `## Buddy Meets Polly

One day, a dog named **Buddy** was walking in a garden.

He heard a voice from a tree saying, "Hello! Hello!"

It was a colorful **parrot** named **Polly**.`,
    image_url: 'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown: `## New Friends

Polly flew down and said, "Let's be friends!"

Buddy wagged his tail. He was happy.

They played in the garden and had fun together.`,
    image_url: 'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown: `## A Scary Cat

A sneaky **cat** came out of the bushes.

Polly got scared. "Help me!" she said.

Buddy barked loud and chased the cat away.`,
    image_url: 'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown: `## Best Friends

Polly gave Buddy a feather and said, "You are my hero!"

They smiled and played more in the garden.

They were best friends forever.`,
    image_url: 'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text_markdown: `## What We Learned

* Be nice to others  
* Help your friends  
* Have fun and explore  

**Buddy and Polly** were different, but they cared for each other.`,
    image_url: 'https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
