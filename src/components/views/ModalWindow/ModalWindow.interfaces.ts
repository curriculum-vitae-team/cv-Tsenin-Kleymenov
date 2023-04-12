import { ReactNode } from 'react'

export interface IModalWindowProps {
  children: ReactNode
  onClose: () => void
}
