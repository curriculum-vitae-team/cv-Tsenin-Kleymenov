import { FC } from 'react'
import { Button } from '@mui/material'

import { IPrimaryButtonProps } from './PrimaryButton.interfaces'

export const PrimaryButton: FC<IPrimaryButtonProps> = ({ children }) => {
  return (
    <Button sx={{ my: 2, p: 1 }} type="submit" fullWidth variant="contained" color="primary">
      {children}
    </Button>
  )
}
