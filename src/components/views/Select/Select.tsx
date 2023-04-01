import { FC, forwardRef } from 'react'
import { InputAdornment, MenuItem, TextField, TextFieldProps } from '@mui/material'

import { Loader } from '@/components/views/Loader/Loader'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'

import { IAppSelectProps, IMastery } from './Select.interfaces'

export const AppSelect: FC<TextFieldProps & IAppSelectProps<IDepartment | IPosition | IMastery>> =
  forwardRef(({ loading, items, ...props }, ref) => {
    return (
      <TextField
        margin="normal"
        color="primary"
        select
        fullWidth
        inputRef={ref}
        {...props}
        InputProps={{
          endAdornment: loading && (
            <InputAdornment position="end">
              <Loader
                size={20}
                sx={{ position: 'static', backgroundColor: 'white' }}
                color="primary"
              />
            </InputAdornment>
          )
        }}
      >
        <MenuItem disabled value={props.label}></MenuItem>
        {items &&
          items.map(item => (
            <MenuItem key={item.id} value={props.label === 'Skills' ? item.name : item.id}>
              {item.name}
            </MenuItem>
          ))}
      </TextField>
    )
  })
