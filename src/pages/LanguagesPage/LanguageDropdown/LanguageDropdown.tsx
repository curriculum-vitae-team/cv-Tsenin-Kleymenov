import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_LANGUAGE } from '@/graphql/languages/deleteLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { LanguageUpdateModal } from '@/pages/LanguagesPage/LanguageUpdateModal/LanguageUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { ILanguageDropdownProps } from './LanguageDropdown.interfaces'

export const LanguageDropdown: FC<ILanguageDropdownProps> = ({ language }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [isVisible, toggleVisibility] = useBooleanState()
  const { t } = useTranslation()

  const [deleteLanguageMutation] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  })

  const handleLanguageDelete = (): void => {
    deleteLanguageMutation({
      variables: { id: language.id }
    })

    toastMessage('Successfully deleted', TOAST_TYPES.success)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('Update')}</MenuItem>
          <MenuItem onClick={handleLanguageDelete}>{t('Delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <LanguageUpdateModal language={language} onClose={toggleVisibility} />}
    </Box>
  )
}
