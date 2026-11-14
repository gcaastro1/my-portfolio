'use client'

import React, { useEffect, useState } from 'react'

import { readStored, writeStored } from '@/utils/storage'
import {
  Language,
  LanguageContextProps,
  LanguageProviderProps,
} from './props'

const initialLanguage: Language = 'en'

const LanguageContext = React.createContext({
  language: initialLanguage,
} as LanguageContextProps)

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    const savedLanguage = readStored('@Language')

    if (savedLanguage === 'en' || savedLanguage === 'pt') {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    writeStored('@Language', language)
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }
