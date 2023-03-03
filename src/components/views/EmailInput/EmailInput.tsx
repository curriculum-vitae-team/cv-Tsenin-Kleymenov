import { forwardRef } from 'react'
import { TextField } from '@mui/material'

import { IEmailInputProps } from './EmailInput.interfaces'

export const EmailInput = forwardRef((props: IEmailInputProps, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      color="primary"
      inputRef={ref}
      fullWidth
      {...props}
    />
  )
})
