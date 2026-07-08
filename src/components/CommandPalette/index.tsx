'use client'

import React, { useEffect, useState, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeContext } from '@/contexts/ThemeContext'
import { LanguageContext } from '@/contexts/LanguageContext'
import styles from './style.module.scss'

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { theme, setTheme } = useContext(ThemeContext)
  const { language, setLanguage } = useContext(LanguageContext)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    } else {
      setSearch('')
    }
  }, [isOpen])

  const commands = [
    {
      id: 'theme-dark',
      label: 'Switch to Dark Theme',
      action: () => { setTheme('dark'); setIsOpen(false) }
    },
    {
      id: 'theme-light',
      label: 'Switch to Light Theme',
      action: () => { setTheme('light'); setIsOpen(false) }
    },
    {
      id: 'lang-en',
      label: 'Switch Language to English',
      action: () => { setLanguage('en'); setIsOpen(false) }
    },
    {
      id: 'lang-pt',
      label: 'Switch Language to Portuguese',
      action: () => { setLanguage('pt'); setIsOpen(false) }
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      action: () => { 
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', '#projects')
        setIsOpen(false)
      }
    },
    {
      id: 'nav-contact',
      label: 'Go to Contact',
      action: () => { 
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', '#contact')
        setIsOpen(false) 
      }
    }
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
            className={styles.palette}
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
              placeholder="Type a command or search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.list}>
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
                <div className={styles.empty}>No commands found.</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
