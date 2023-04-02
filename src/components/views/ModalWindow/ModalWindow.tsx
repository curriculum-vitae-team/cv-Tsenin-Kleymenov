import { FC } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { DialogContent, IconButton } from '@mui/material'

import { IModalWindowProps } from './ModalWindow.interfaces'
import { Dialog } from './ModalWindow.styles'

export const ModalWindow: FC<IModalWindowProps> = ({ children, modalOpen, closeModal }) => {
  return (
    <Dialog onClose={closeModal} open={modalOpen}>
      <IconButton sx={{ alignSelf: 'flex-end' }} onClick={closeModal}>
        <ClearIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
