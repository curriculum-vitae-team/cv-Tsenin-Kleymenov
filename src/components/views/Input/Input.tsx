import { FC, forwardRef } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

import { IInputWithIcon } from './Input.interfaces'
import { InputAdornment } from './Input.styles'

export const Input = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
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
