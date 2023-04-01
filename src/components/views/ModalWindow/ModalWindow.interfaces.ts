import { ReactNode } from 'react'

export interface IModalWindowProps {
  children: ReactNode
  modalOpen: boolean
  closeModal: () => void
}
