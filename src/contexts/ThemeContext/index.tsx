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

  useEffect(() => {
    const savedTheme = localStorage.getItem('@Theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('@Theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
