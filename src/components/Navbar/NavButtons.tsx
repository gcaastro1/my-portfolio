'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import NavbarToggle from './NavbarToggle'
import ThemeSwitcher from './ThemeSwitcher'
import styles from './style.module.scss'

const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
  { title: 'Stack', href: '#stack' },
  { title: 'Contact', href: '#contact' },
]

const NavButtons = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <div className={styles.navigation}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.navigation__backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <nav
        className={`${styles.navigation__menu} ${
          isOpen ? styles.navigation__menuOpen : ''
        }`}
        aria-label="Main navigation"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={false}
            animate={isOpen ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: index * 0.035 }}
          >
            <Link href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>
              {item.title}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className={styles.navigation__actions}>
        <span className={styles.language} title="Portuguese version coming soon">
          EN
        </span>
        <ThemeSwitcher />
        <NavbarToggle
          menuToggle={() => setIsOpen((current) => !current)}
          isOpen={isOpen}
        />
      </div>
    </div>
  )
}

export default NavButtons
