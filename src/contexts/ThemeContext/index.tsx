'use client'

import React, { useEffect, useState } from 'react'
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
    try {
      const savedTheme = localStorage.getItem('@Theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme)
      }
    } catch {
      // storage bloqueado: segue com o tema escuro
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('@Theme', theme)
    } catch {
      // storage bloqueado: o tema só vale para esta sessão
    }
  }, [theme, ready])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
