import { FC, forwardRef } from 'react'
import { TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material'

export const Input: FC<TextFieldProps> = forwardRef((props, ref) => {
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
