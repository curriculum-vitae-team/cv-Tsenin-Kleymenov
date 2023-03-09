import { FC } from 'react'
import { Typography } from '@mui/material'

import { IFormSubtitleProps } from './FormSubtitle.interfacex'

export const FormSubtitle: FC<IFormSubtitleProps> = ({ children }) => {
  return (
    <Typography variant="h6" component="h2">
      {children}
    </Typography>
  )
}
