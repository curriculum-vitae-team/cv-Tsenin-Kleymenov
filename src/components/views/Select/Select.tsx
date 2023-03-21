import { FC, forwardRef } from 'react'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

export const AppSelect: FC<TextFieldProps & { items: Array<string> }> = forwardRef(
  ({ items, ...props }, ref) => {
    return (
      <TextField
        margin="normal"
        color="primary"
        select
        fullWidth
        defaultValue={''}
        inputRef={ref}
        {...props}
      >
        <MenuItem disabled value={''}>
          {props.label}
        </MenuItem>
        {items.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    )
  }
)
