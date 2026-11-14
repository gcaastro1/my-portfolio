'use client'

import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import { onAnchorClick } from '@/utils/smoothScroll'
import ThemeSwitcher from './ThemeSwitcher'
import styles from './style.module.scss'

const TitleBar = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const copy = translations[language].nav

  return (
    <header className={styles.titlebar}>
      <span className={styles.titlebar__dots} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <a className={styles.titlebar__title} href="#home" onClick={onAnchorClick}>
        gustavo <span>&lt;lima&gt;</span>
      </a>

      <div className={styles.titlebar__actions}>
        <div
          className={styles.language}
          role="group"
          aria-label={copy.languageLabel}
        >
          <button
            type="button"
            className={language === 'en' ? styles.language__active : ''}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <button
            type="button"
            className={language === 'pt' ? styles.language__active : ''}
            onClick={() => setLanguage('pt')}
            aria-pressed={language === 'pt'}
          >
            PT
          </button>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default TitleBar
