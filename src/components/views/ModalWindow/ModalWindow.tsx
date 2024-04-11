import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ClearIcon from '@mui/icons-material/Clear'
import { Dialog } from '@mui/material'

import { IModalWindowProps } from './ModalWindow.interfaces'
import { CloseButton, DialogContent, ModalHeader, ModalTitle } from './ModalWindow.styles'

export const ModalWindow: FC<IModalWindowProps> = ({ children, title, onClose }) => {
  const { t } = useTranslation()

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <ModalHeader>
          <ModalTitle>{t(title ?? '')}</ModalTitle>
          <CloseButton onClick={onClose}>
            <ClearIcon />
          </CloseButton>
        </ModalHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
