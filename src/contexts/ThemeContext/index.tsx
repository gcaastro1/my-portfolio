'use client'

import React, { useEffect, useState } from 'react'
import { readStored, writeStored } from '@/utils/storage'
import { Theme, ThemeContextProps, ThemeProviderProps } from './props'

export const initialThemeState = {
  theme: 'dark' as Theme,
}

const ThemeContext = React.createContext({
  theme: initialThemeState.theme,
} as ThemeContextProps)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialThemeState.theme)
  // Só grava depois de ler o tema salvo; senão o 'dark' inicial sobrescreve a preferência.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedTheme = readStored('@Theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.dataset.theme = theme
    writeStored('@Theme', theme)
  }, [theme, ready])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
