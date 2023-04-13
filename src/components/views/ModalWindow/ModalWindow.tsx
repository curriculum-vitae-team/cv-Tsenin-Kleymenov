import { FC } from 'react'
import ClearIcon from '@mui/icons-material/Clear'

import { IModalWindowProps } from './ModalWindow.interfaces'
import { CloseButton, Dialog, DialogContent } from './ModalWindow.styles'

export const ModalWindow: FC<IModalWindowProps> = ({ children, onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <CloseButton onClick={onClose}>
          <ClearIcon />
        </CloseButton>
        {children}
      </DialogContent>
    </Dialog>
  )
}
