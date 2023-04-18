import { useCallback, useState } from 'react'

export const useBooleanState = (
  initialState: boolean | (() => boolean) = false
): {
  isVisible: boolean
  toggleVisibility: () => void
  setInvisible: () => void
  setVisible: () => void
} => {
  const [isVisible, setIsVisible] = useState(initialState)

  const setVisible = useCallback(() => setIsVisible(true), [])
  const setInvisible = useCallback(() => setIsVisible(false), [])
  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), [])

  return { isVisible, toggleVisibility, setInvisible, setVisible } as const
}
