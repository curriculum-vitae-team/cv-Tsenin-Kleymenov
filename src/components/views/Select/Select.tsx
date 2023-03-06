import { forwardRef } from 'react'
import { MenuItem, TextField } from '@mui/material'

import { IAppSelectProps } from './Select.interfaces'

export const AppSelect = forwardRef((props: IAppSelectProps, ref) => {
  return (
    <TextField
      variant="outlined"
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
      <MenuItem value={'Unit 1(JavaScript)'}>Unit 1(JavaScript)</MenuItem>
      <MenuItem value={'Unit 2(Java)'}>Unit 2(Java)</MenuItem>
      <MenuItem value={'Unit 3(Python)'}>Unit 3(Python)</MenuItem>
    </TextField>
  )
})
