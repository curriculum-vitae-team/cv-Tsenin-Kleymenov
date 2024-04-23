import { CircularProgressProps } from '@mui/material'

export interface ILoadingOverlayProps extends CircularProgressProps {
  active: boolean
  position?: string
  children: React.ReactNode
}
