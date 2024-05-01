import { forwardRef, ReactElement } from 'react'
import { ExpandMore } from '@mui/icons-material'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { Loader } from '@/components/views/Loader/Loader'

import { IAppSelectItemProps, IAppSelectProps } from './Select.interfaces'

const SelectLoader = (): ReactElement => (
  <Loader
    size={20}
    sx={{ position: 'absolute', left: 'auto', right: '12px', top: 'auto' }}
    color="primary"
  />
)

export const AppSelect = forwardRef<
  HTMLInputElement,
  TextFieldProps & IAppSelectProps<IAppSelectItemProps>
>(({ loading, items, ...props }, ref) => {
  return (
    <TextField
      margin="normal"
      color="primary"
      select
      fullWidth
      inputRef={ref}
      {...props}
      SelectProps={{
        IconComponent: loading ? SelectLoader : ExpandMore
      }}
    >
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
