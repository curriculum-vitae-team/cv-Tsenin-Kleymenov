import { ButtonProps } from '@mui/material/Button'

export interface IButtonProps extends ButtonProps {
  children: string
  disabled?: boolean
}
