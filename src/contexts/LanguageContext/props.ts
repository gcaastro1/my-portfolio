import { Dispatch, ReactNode, SetStateAction } from 'react'

export type Language = 'en' | 'pt'

export interface LanguageProviderProps {
  children: ReactNode
}

export interface LanguageContextProps {
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
}
