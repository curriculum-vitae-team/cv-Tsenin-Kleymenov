import { FC, forwardRef } from 'react'
import { TextField } from '@mui/material'

import { IInputProps } from './Input.interfaces'

export const Input: FC<IInputProps> = forwardRef((props, ref) => {
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
