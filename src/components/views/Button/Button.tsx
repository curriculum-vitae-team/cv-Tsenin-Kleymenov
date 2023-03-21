import { FC } from 'react'
import { Button as MuiButton, Typography } from '@mui/material'

import { IButtonProps } from './Button.interfaces'

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <MuiButton sx={{ my: 2, p: 1 }} fullWidth {...props}>
      <Typography>{children}</Typography>
    </MuiButton>
  )
}
