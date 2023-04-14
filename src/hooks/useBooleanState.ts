import { useCallback, useState } from 'react'

export const useBooleanState = (
  initialState: boolean | (() => boolean) = false
): readonly [boolean, () => void, () => void, () => void] => {
  const [isVisible, setIsVisible] = useState(initialState)

  const setVisible = useCallback(() => setIsVisible(true), [])
  const setInvisible = useCallback(() => setIsVisible(false), [])
  const toggleVisibility = useCallback(() => setIsVisible(prev => !prev), [])

  return [isVisible, toggleVisibility, setInvisible, setVisible] as const
}
