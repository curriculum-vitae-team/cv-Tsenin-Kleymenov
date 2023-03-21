import { FC, forwardRef } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

export const Input: FC<TextFieldProps> = forwardRef((props, ref) => {
  return <TextField margin="normal" color="primary" inputRef={ref} fullWidth {...props} />
})
