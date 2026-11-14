'use client'

import { MoonStars, Sun } from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { ThemeContext } from '@/contexts/ThemeContext'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)
  const copy = translations[language].nav
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? copy.switchToLight : copy.switchToDark}
    >
      {isDark ? (
        <Sun size={16} weight="bold" />
      ) : (
        <MoonStars size={16} weight="bold" />
      )}
    </button>
  )
}

export default ThemeSwitcher
