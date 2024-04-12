import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Typography } from '@mui/material'

import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { DELETE_PROFILE_LANGUAGE } from '@/graphql/language/profile_language/deleteProfileLanguageMutation'

import { ILanguageItemDeleteProps } from './LanguagesDeleteModal.interfaces'
import { ModalAction, ModalGroupButtons } from './LanguagesDeleteModal.styles'

const LanguageItemDeleteModal: FC<ILanguageItemDeleteProps> = ({ userData, onClose }) => {
  const { t } = useTranslation()
  const [deleteProfileLanguage, { loading: deleteProfileLangLoading }] =
    useMutation(DELETE_PROFILE_LANGUAGE)

  const onSubmit = async (): Promise<void> => {
    await deleteProfileLanguage({
      variables: {
        language: {
          userId: userData?.id,
          name: userData?.name
        }
      }
    })

    onClose()
  }
  return (
    <ModalWindow fullWidth maxWidth="sm" onClose={onClose} title={t('confirmRemoveLanguage') ?? ''}>
      <Typography>{t('confirmRemoveLanguageMessage')}</Typography>
      <ModalGroupButtons>
        <ModalAction variant="text" onClick={onClose}>
          {t('cancel')}
        </ModalAction>
        <ModalAction variant="contained" onClick={onSubmit} loading={deleteProfileLangLoading}>
          {t('remove')}
        </ModalAction>
      </ModalGroupButtons>
    </ModalWindow>
  )
}

export default LanguageItemDeleteModal
