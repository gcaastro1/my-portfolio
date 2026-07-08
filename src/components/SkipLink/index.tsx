'use client'

import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'

const SkipLink = () => {
  const { language } = useContext(LanguageContext)

  return (
    <a className="skip-link" href="#main-content">
      {translations[language].skipToContent}
    </a>
  )
}

export default SkipLink
