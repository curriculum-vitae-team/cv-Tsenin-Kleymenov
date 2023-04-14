import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { DATE_FORMAT } from '@/constants/dateFormats'
import { IProjectFormValues } from '@/pages/ProjectsPage/ProjectsPage.interfaces'

import { DatePickerInputProps } from './DatePicker.interfaces'

export const DatePicker: FC<DatePickerInputProps<IProjectFormValues>> = ({
  control,
  label,
  name
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={value || null}
            onChange={onChange}
            inputFormat={DATE_FORMAT.datePicker}
            renderInput={params => (
              <TextField
                {...params}
                margin="normal"
                fullWidth
                label={label}
                helperText={fieldState.error?.message || ''}
                error={!!fieldState.error}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}
