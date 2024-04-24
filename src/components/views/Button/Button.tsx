import { FC } from 'react'
import { LoadingButton } from '@mui/lab'

import { IButtonProps } from './Button.interfaces'

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <LoadingButton sx={{ my: 2, p: 1 }} fullWidth {...props}>
      {children}
    </LoadingButton>
  )
}
