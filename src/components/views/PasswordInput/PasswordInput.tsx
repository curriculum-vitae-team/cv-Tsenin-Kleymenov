import React, { forwardRef, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material'

import { Input } from '@/components/views/Input/Input'

export const PasswordInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = (): void => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      inputRef={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="info"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
})
