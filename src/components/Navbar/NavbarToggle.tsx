'use client'

import { motion } from 'framer-motion'
import styles from './style.module.scss'
import { List, X } from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'

interface ToggleProps {
  menuToggle: () => void
  isOpen: boolean
}

const NavbarToggle = ({ menuToggle, isOpen }: ToggleProps) => {
  const Icon = isOpen ? X : List
  const { language } = useContext(LanguageContext)
  const copy = translations[language].nav

  return (
    <motion.button
      type="button"
      className={styles.toggle}
      onClick={menuToggle}
      whileTap={{ scale: 0.6 }}
      aria-label={isOpen ? copy.closeMenu : copy.openMenu}
      aria-expanded={isOpen}
    >
      <Icon size={22} weight="bold" />
    </motion.button>
  )
}

export default NavbarToggle
