import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_LANGUAGE } from '@/graphql/language/deleteLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { LanguageUpdateModal } from '@/pages/LanguagesPage/LanguageUpdateModal/LanguageUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { ILanguageDropdownProps } from './LanguageDropdown.interfaces'

export const LanguageDropdown: FC<ILanguageDropdownProps> = ({ language }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [deleteLanguageMutation] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  })

  const { t } = useTranslation()

  const handleLanguageDelete = (): void => {
    deleteLanguageMutation({
      variables: {
        language: {
          languageId: language.id
        }
      }
    })

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
          <MenuItem onClick={handleLanguageDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <LanguageUpdateModal language={language} onClose={toggleVisibility} />}
    </Box>
  )
}
