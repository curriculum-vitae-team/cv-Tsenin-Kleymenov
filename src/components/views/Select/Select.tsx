import { FC, forwardRef } from 'react'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'

export const AppSelect: FC<TextFieldProps & { items: undefined | IPosition[] | IDepartment[] }> =
  forwardRef(({ items, ...props }, ref) => {
    return (
      <TextField margin="normal" color="primary" select fullWidth inputRef={ref} {...props}>
        <MenuItem disabled>{props.label}</MenuItem>
        {items &&
          items.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </TextField>
    )
  })
