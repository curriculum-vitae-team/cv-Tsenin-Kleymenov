import { FC } from 'react'
import { Button as MuiButton, ButtonProps } from '@mui/material'

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton sx={{ my: 2, p: 1 }} fullWidth color="primary" {...props}>
      {children}
    </MuiButton>
  )
}
