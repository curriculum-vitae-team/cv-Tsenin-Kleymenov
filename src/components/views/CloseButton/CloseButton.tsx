import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { ICloseButtonProps } from './CloseButton.interfaces'
import { IconButton } from './CloseButton.styles'

export const CloseButton: FC<ICloseButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  )
}
