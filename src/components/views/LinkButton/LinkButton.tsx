import { FC } from 'react'
import { Button } from '@mui/material'

import { ILinkButtonProps } from './LinkButton.interface'

export const LinkButton: FC<ILinkButtonProps> = ({ children }) => {
  return (
    <Button sx={{ my: 1, p: 1 }} fullWidth variant="text" color="primary">
      {children}
    </Button>
  )
}
