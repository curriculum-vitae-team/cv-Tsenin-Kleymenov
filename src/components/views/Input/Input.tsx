import { FC, forwardRef } from 'react'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

import { IInputWithIcon } from './Input.interfaces'

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

export const InputWithIcon: FC<IInputWithIcon> = ({ icon, position, ...props }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position={position}>{icon}</InputAdornment>
      }}
      {...props}
    />
  )
}
