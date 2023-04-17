import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { DELETE_LANGUAGE } from '@/graphql/language/deleteLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { LanguageUpdateModal } from '@/pages/LanguagesPage/LanguageUpdateModal/LanguageUpdateModal'

import { ILanguageDropdownProps } from './LanguageDropdown.interfaces'

export const LanguageDropdown: FC<ILanguageDropdownProps> = ({ language }) => {
  const [_, isAdmin] = useUser()

  const [isVisible, toggleVisibility] = useBooleanState()

  const [deleteLanguageMutation] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  })

  const { t } = useTranslation()

  const handleLanguageDelete = (): void => {
    deleteLanguageMutation({
      variables: { id: language.id }
    })
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
