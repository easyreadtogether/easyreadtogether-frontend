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
  simplifiedContent: [],
  fontSize: 'medium',
  contentLayout: 'image-right',
  loading: false,
  error: null,

  setOriginalText: text => set({ originalText: text }),
  setFile: file => set({ file }),
  setLanguage: language => set({ language }),

  setSimplifiedContent: async data => {
    set({
      simplifiedContent: data
    })
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
