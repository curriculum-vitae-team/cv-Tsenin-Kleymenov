import { FC } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_LANGUAGE } from '@/graphql/languages/deleteLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { LanguageUpdateModal } from '@/pages/LanguagesPage/LanguageUpdateModal/LanguageUpdateModal'

import { ILanguageDropdownProps } from './LanguageDropdown.interfaces'

export const LanguageDropdown: FC<ILanguageDropdownProps> = ({ language }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [isVisible, toggleVisibility] = useBooleanState()

  const [deleteLanguageMutation] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  })

  const handleLanguageDelete = (): void => {
    deleteLanguageMutation({
      variables: { id: language.id }
    })
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>Update</MenuItem>
          <MenuItem onClick={handleLanguageDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <LanguageUpdateModal language={language} onClose={toggleVisibility} />}
    </Box>
  )
}
