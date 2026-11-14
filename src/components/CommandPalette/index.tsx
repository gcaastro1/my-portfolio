'use client'

import React, { useEffect, useState, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeContext } from '@/contexts/ThemeContext'
import { LanguageContext } from '@/contexts/LanguageContext'
import { OPEN_PALETTE_EVENT } from '@/utils/events'
import { nextFocusIndex } from '@/utils/focusTrap'
import { translations } from '@/utils/i18n'
import { scrollToHash } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  
  const { theme, setTheme } = useContext(ThemeContext)
  const { language, setLanguage } = useContext(LanguageContext)
  const copy = translations[language].palette

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    const handleOpen = () => setIsOpen(true)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener(OPEN_PALETTE_EVENT, handleOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener(OPEN_PALETTE_EVENT, handleOpen)
    }
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      previousFocus.current = document.activeElement as HTMLElement | null
      inputRef.current.focus()
    } else {
      setSearch('')
      previousFocus.current?.focus()
      previousFocus.current = null
    }
  }, [isOpen])

  const trapTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !paletteRef.current) return
    const focusable = Array.from(
      paletteRef.current.querySelectorAll<HTMLElement>('input, button'),
    )
    const next = nextFocusIndex(
      focusable.indexOf(document.activeElement as HTMLElement),
      focusable.length,
      event.shiftKey,
    )
    if (next < 0) return
    event.preventDefault()
    focusable[next].focus()
  }

  const goTo = (hash: string) => {
    scrollToHash(hash)
    setIsOpen(false)
  }

  const commands = [
    {
      id: 'theme-dark',
      label: copy.themeDark,
      action: () => { setTheme('dark'); setIsOpen(false) },
    },
    {
      id: 'theme-light',
      label: copy.themeLight,
      action: () => { setTheme('light'); setIsOpen(false) },
    },
    {
      id: 'lang-en',
      label: copy.langEn,
      action: () => { setLanguage('en'); setIsOpen(false) },
    },
    {
      id: 'lang-pt',
      label: copy.langPt,
      action: () => { setLanguage('pt'); setIsOpen(false) },
    },
    { id: 'nav-projects', label: copy.goProjects, action: () => goTo('#projects') },
    { id: 'nav-contact', label: copy.goContact, action: () => goTo('#contact') },
  ]

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  // Don't render server-side
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <motion.div
            ref={paletteRef}
            className={styles.palette}
            onKeyDown={trapTab}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input 
              ref={inputRef}
              type="text" 
              className={styles.input}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.list} data-lenis-prevent>
              {filteredCommands.length > 0 ? (
                filteredCommands.map(cmd => (
                  <button 
                    key={cmd.id} 
                    className={styles.item}
                    onClick={cmd.action}
                  >
                    {cmd.label}
                  </button>
                ))
              ) : (
                <div className={styles.empty}>{copy.empty}</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
