import { TextFieldProps } from '@mui/material'

export type IInputWithIcon = TextFieldProps & {
  icon: React.ReactNode
  position: 'start' | 'end'
}
