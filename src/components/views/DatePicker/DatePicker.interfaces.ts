import { Control, Path } from 'react-hook-form'

export type DatePickerInputProps<T> = {
  name: Path<T>
  label: string
  control: Control<T>
}
