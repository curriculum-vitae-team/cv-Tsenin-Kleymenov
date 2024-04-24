import { useState } from 'react'

import { LocalStorageKeys } from '@/constants/localStorageKeys'
import { Theme } from '@/constants/theme'

export interface IUseTheme {
  theme: Theme
  setTheme: (newTheme: Theme) => void
}

const getInitialTheme = (): Theme => {
  return (localStorage.getItem(LocalStorageKeys.Theme) || Theme.LIGHT) as Theme
}

const useTheme = (): IUseTheme => {
  const [theme, setThemeState] = useState(getInitialTheme)

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme)

    localStorage.setItem(LocalStorageKeys.Theme, newTheme)
  }

  return { theme, setTheme }
}

export default useTheme
