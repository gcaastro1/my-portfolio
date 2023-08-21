import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface ThemeProviderProps {
  children: ReactNode
}

export interface ThemeContextProps {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}
