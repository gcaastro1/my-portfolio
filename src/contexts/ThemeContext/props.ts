import { Dispatch, ReactNode, SetStateAction } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeProviderProps {
  children: ReactNode
}

export interface ThemeContextProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}
