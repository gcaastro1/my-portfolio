'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import NavbarToggle from './NavbarToggle'
import ThemeSwitcher from './ThemeSwitcher'
import styles from './style.module.scss'

const NavButtons = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const { language, setLanguage } = useContext(LanguageContext)
  const copy = translations[language]
  const navItems = [
    { title: copy.nav.home, href: '#home' },
    { title: copy.nav.about, href: '#about' },
    { title: copy.nav.experience, href: '#experience' },
    { title: copy.nav.projects, href: '#projects' },
    { title: copy.nav.stack, href: '#stack' },
    { title: copy.nav.contact, href: '#contact' },
  ]

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.5 }
    )

    // Wait a tick for DOM to be ready just in case
    setTimeout(() => {
      navItems.forEach((item) => {
        const id = item.href.replace('#', '')
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => observer.disconnect()
  }, [language]) // re-run if language changes (DOM updates)

  const closeMenu = () => setIsOpen(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
      closeMenu()
    } else {
      closeMenu()
    }
  }

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
        aria-label={copy.nav.label}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={false}
            animate={isOpen ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: index * 0.035 }}
            style={{ position: 'relative' }}
          >
            <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
              <span>0{index + 1}</span>
              {item.title}
              {activeSection === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className={styles.activeIndicator}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          </motion.div>
        ))}
      </nav>

      <div className={styles.navigation__actions}>
        <div className={styles.language} aria-label={copy.nav.languageLabel}>
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
        <NavbarToggle
          menuToggle={() => setIsOpen((current) => !current)}
          isOpen={isOpen}
        />
      </div>
    </div>
  )
}

export default NavButtons
