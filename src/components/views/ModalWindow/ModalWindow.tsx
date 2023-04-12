import { FC } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { DialogContent } from '@mui/material'

import { IModalWindowProps } from './ModalWindow.interfaces'
import { CloseButton, Dialog } from './ModalWindow.styles'

export const ModalWindow: FC<IModalWindowProps> = ({ children, onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <CloseButton onClick={onClose}>
        <ClearIcon />
      </CloseButton>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
