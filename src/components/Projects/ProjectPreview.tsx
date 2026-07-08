'use client'

import { useContext } from 'react'
import Image from 'next/image'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

const ProjectPreview = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].projects

  return (
    <div className={styles.preview} aria-label={copy.previewLabel}>
      <div className={styles.preview__browser}>
        <span />
        <span />
        <span />
        <p>gustavolima.dev</p>
      </div>
      <div className={styles.preview__imageContainer}>
        <Image 
          src="/portfolio.png" 
          alt="Portfolio preview" 
          width={800}
          height={600}
          className={styles.preview__image}
          priority
        />
      </div>
    </div>
  )
}

export default ProjectPreview
