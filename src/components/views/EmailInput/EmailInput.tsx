import { forwardRef } from 'react'
import { TextField } from '@mui/material'

import { IEmailInputProps } from './EmailInput.interface'

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
