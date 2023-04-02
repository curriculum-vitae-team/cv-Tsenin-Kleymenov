import { FC } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { DialogContent } from '@mui/material'

import { IModalWindowProps } from './ModalWindow.interfaces'
import { CloseButton,Dialog } from './ModalWindow.styles'

export const ModalWindow: FC<IModalWindowProps> = ({ children, modalOpen, closeModal }) => {
  return (
    <Dialog onClose={closeModal} open={modalOpen}>
      <CloseButton onClick={closeModal}>
        <ClearIcon />
      </CloseButton>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
