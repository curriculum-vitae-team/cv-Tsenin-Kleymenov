import { ReactNode } from 'react'
import { DialogProps } from '@mui/material'

export interface IModalWindowProps extends Omit<DialogProps, 'open'> {
  title?: string
  children: ReactNode
  open?: boolean
}
