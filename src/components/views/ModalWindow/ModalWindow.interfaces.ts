import { ReactNode } from 'react'

export interface IModalWindowProps {
  children: ReactNode
  open: boolean
  onClose: () => void
}
