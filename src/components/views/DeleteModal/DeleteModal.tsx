import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'

import { IDeleteModalProps } from './DeleteModal.interfaces'
import { ModalAction, ModalGroupButtons } from './DeleteModal.styles'

const DeleteModal: FC<IDeleteModalProps> = ({ onSubmit, onClose, isLoading, message, title }) => {
  const { t } = useTranslation()

  return (
    <ModalWindow fullWidth maxWidth="sm" onClose={onClose} title={t(title) ?? title ?? ''}>
      <Typography>{t(message) ?? message ?? ''}</Typography>
      <ModalGroupButtons>
        <ModalAction variant="text" onClick={onClose}>
          {t('cancel')}
        </ModalAction>
        <ModalAction variant="contained" onClick={onSubmit} loading={isLoading}>
          {t('remove')}
        </ModalAction>
      </ModalGroupButtons>
    </ModalWindow>
  )
}

export default DeleteModal
