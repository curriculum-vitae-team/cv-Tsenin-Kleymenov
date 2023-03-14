import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import { ILinkButtonProps } from './LinkButton.interfaces'

export const LinkButton: FC<ILinkButtonProps> = ({ children, to }) => {
  return (
    <Button component={Link} to={to} fullWidth variant="text" color="primary" sx={{ my: 1, p: 1 }}>
      {children}
    </Button>
  )
}
