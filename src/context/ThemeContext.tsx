import { createContext, FC, useContext } from 'react'

import useTheme, { IUseTheme } from '@/hooks/useTheme'

interface IThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<IUseTheme | null>(null)

export const ThemeContextProvider: FC<IThemeProviderProps> = ({ children }) => {
  const { theme, setTheme } = useTheme()

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = (): IUseTheme => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }

  return context
}
