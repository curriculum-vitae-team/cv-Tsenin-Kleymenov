import { FC } from 'react'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'

import { IButtonProps } from './Button.interfaces'

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <LoadingButton sx={{ my: 2, p: 1 }} fullWidth {...props}>
      <Typography>{children}</Typography>
    </LoadingButton>
  )
}
