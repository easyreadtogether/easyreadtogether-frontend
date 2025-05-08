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
  language: 'English',
  simplifiedContent: [
    {
      text_markdown: `We have met here in Berlin to work together for people with disabilities to be included around the world.`,
      image_url: 'images/1.png'
    },
    {
      text_markdown: `We agree everyone with disabilities should have equal rights, based on the Convention on the Rights of Persons with Disabilities (CRPD).`,
      image_url: 'images/2.png'
    },
    {
      text_markdown: `The CRPD is a document that explains how governments have to meet the needs of people with disabilities.`,
      image_url: 'images/3.png'
    },
    {
      text_markdown: `If you don't know about the CRPD, you can see an Easy Read version of the CRPD by clicking this link.`,
      image_url: 'images/4.png'
    },
    {
      text_markdown: `This document is a declaration. A declaration is a clear, official statement someone or an organization makes to share their plans, thoughts, or choices.`,
      image_url: 'images/5.png'
    },
    {
      text_markdown: `We are using ideas from the last summits in 2018 and 2022 and other meetings.`,
      image_url: 'images/6.png'
    },
    {
      text_markdown: `We want to work together to make the world fairer for everyone. We think this is very important.`,
      image_url: 'images/7.png'
    },
    {
      text_markdown: `After the summit, we agree to work on the things in the Declaration together.`,
      image_url: 'images/8.png'
    }
  ],
  fontSize: 'medium',
  contentLayout: 'image-right',
  loading: false,
  error: null,

  setOriginalText: text => set({ originalText: text }),
  setFile: file => set({ file }),
  setLanguage: language => set({ language }),

  simplifyContent: async data => {
    set({ loading: true, error: null })
    try {
      // Store the simplified content from the API response
      set({
        simplifiedText: data?.simplifiedText || data?.result, // adjust based on your API response
        loading: false
      })
    } catch (error) {
      set({
        error: error.message || 'Error simplifying content',
        loading: false
      })
      throw error
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
