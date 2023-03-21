import { FC } from 'react'
import { Button as MuiButton } from '@mui/material'

import { IButtonProps } from './Button.interfaces'

export const Button: FC<IButtonProps> = ({ children, disabled, ...props }) => {
  return (
    <MuiButton {...props} disabled={disabled} sx={{ my: 2, p: 1 }} fullWidth color="primary">
      {children}
    </MuiButton>
  )
}
