import { forwardRef } from 'react'
import { TextField } from '@mui/material'

import { IInputProps } from './Input.interfaces'

export const Input = forwardRef((props: IInputProps, ref) => {
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
