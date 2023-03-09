import { FC } from 'react'
import { Typography } from '@mui/material'

import { IFormTitleProps } from './FormTitle.interfaces'

export const FormTitle: FC<IFormTitleProps> = ({ children }) => {
  return (
    <Typography sx={{ my: 1 }} variant="h3" component="h1">
      {children}
    </Typography>
  )
}
