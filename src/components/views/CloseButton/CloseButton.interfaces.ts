import { IconButtonProps } from '@mui/material'

export interface ICloseButtonProps extends IconButtonProps {
  onClick: (event: React.MouseEvent) => void
}
