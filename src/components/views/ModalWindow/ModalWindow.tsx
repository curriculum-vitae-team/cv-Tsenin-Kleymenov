import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog } from '@mui/material'

import { IModalWindowProps } from './ModalWindow.interfaces'
import { CloseButton, DialogContent, ModalHeader, ModalTitle } from './ModalWindow.styles'

export const ModalWindow: FC<IModalWindowProps> = ({ children, title, onClose, ...rest }) => {
  const { t } = useTranslation()

  const onModalClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void => {
    if (reason && reason === 'backdropClick') return

    if (onClose && reason === 'escapeKeyDown') onClose(event, 'escapeKeyDown')
  }

  const handleClose = (event: React.MouseEvent): void => {
    onModalClose(event, 'escapeKeyDown')
  }

  return (
    <Dialog {...rest} open onClose={handleClose}>
      <DialogContent>
        <ModalHeader>
          <ModalTitle variant="h2">{t(title ?? '')}</ModalTitle>
          <CloseButton onClick={handleClose} />
        </ModalHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
