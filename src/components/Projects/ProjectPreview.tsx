'use client'

import { useContext } from 'react'
import Image from 'next/image'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

interface ProjectPreviewProps {
  image?: string
  title: string
  host?: string
}

const ProjectPreview = ({ image, title, host }: ProjectPreviewProps) => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].projects

  return (
    <div className={styles.preview} aria-label={copy.previewLabel}>
      <div className={styles.preview__browser}>
        <span />
        <span />
        <span />
        {host && <p>{host}</p>}
      </div>
      {image ? (
        <div className={styles.preview__imageContainer}>
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            className={styles.preview__image}
            priority
          />
        </div>
      ) : (
        <div className={styles.preview__placeholder}>
          <span>
            <b>{'//'}</b> {title}
          </span>
        </div>
      )}
    </div>
  )
}

export default ProjectPreview
