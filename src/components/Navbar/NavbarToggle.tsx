'use client'

import { motion } from 'framer-motion'
import styles from './style.module.scss'
import { List, X } from '@phosphor-icons/react'

interface ToggleProps {
  menuToggle: () => void
  isOpen: boolean
}

const NavbarToggle = ({ menuToggle, isOpen }: ToggleProps) => {
  const Icon = isOpen ? X : List

  return (
    <motion.button
      type="button"
      className={styles.toggle}
      onClick={menuToggle}
      whileTap={{ scale: 0.6 }}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      <Icon size={22} weight="bold" />
    </motion.button>
  )
}

export default NavbarToggle
