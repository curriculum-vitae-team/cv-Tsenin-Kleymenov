import { FC } from 'react'
import { Box, Typography } from '@mui/material'

import { IErrorUploadMessageProps } from './ErrorUploadMessage.interfaces'

export const ErrorUploadMessage: FC<IErrorUploadMessageProps> = ({ file, errors }) => {
  return (
    <Box key={file.name}>
      {errors.map(error => (
        <Typography key={error.code}>{error.message}</Typography>
      ))}
    </Box>
  )
}
