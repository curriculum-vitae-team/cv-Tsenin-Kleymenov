import { useEffect, useState } from 'react'
import { makeVar } from '@apollo/client'

import { LocalStorageKeys } from '@/constants/localStorageKeys'
import { Theme } from '@/constants/theme'

interface IUseTheme {
  theme: string
  setTheme: (newTheme: Theme) => void
}

const getInitialTheme = (): string => {
  return localStorage.getItem(LocalStorageKeys.Theme) || Theme.LIGHT
}

const useTheme = (): IUseTheme => {
  const [theme, setThemeState] = useState(getInitialTheme)

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme)
    localStorage.setItem(LocalStorageKeys.Theme, newTheme)
  }

  useEffect(() => {
    const themeVar = makeVar(theme)

    return () => {
      themeVar(theme)
    }
  }, [theme])

  return { theme, setTheme }
}

export default useTheme
