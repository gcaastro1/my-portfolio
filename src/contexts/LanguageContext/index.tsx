'use client'

import React, { useEffect, useState } from 'react'

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
    const savedLanguage = localStorage.getItem('@Language')

    if (savedLanguage === 'en' || savedLanguage === 'pt') {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('@Language', language)
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider }
