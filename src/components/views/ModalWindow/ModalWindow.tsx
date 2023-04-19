import { FC } from 'react'
import ClearIcon from '@mui/icons-material/Clear'

import { IBaseChildrenProps } from '@/appTypes/IBaseChildrenProps.interfaces'
import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'

import { CloseButton, Dialog, DialogContent } from './ModalWindow.styles'

export const ModalWindow: FC<Extract<IBaseModalProps, IBaseChildrenProps>> = ({
  children,
  onClose
}) => {
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
