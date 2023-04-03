import { ReactNode } from 'react'

export const getFirstChars = (string?: string): string | ReactNode => {
  if (string) {
    return string
      .split(' ')
      .map(item => item.charAt(0).toUpperCase())
      .join('')
  }
}
