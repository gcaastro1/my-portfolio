'use client'

import { MoonStars, Sun } from '@phosphor-icons/react'
import styles from './style.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'
import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import { motion } from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)
  const copy = translations[language].nav
  const Icon = theme === 'light' ? MoonStars : Sun

  const handleSwitch = () => {
    if (theme === 'dark') setTheme('light')
    if (theme === 'light') setTheme('dark')
  }

  return (
    <button
      type="button"
      className={styles.switch}
      data-theme={theme}
      onClick={handleSwitch}
      aria-label={theme === 'light' ? copy.switchToDark : copy.switchToLight}
    >
      <motion.span className={styles.switch__handle} layout transition={spring}>
        <Icon size={14} weight="bold" />
      </motion.span>
    </button>
  )
}

export default ThemeSwitch
