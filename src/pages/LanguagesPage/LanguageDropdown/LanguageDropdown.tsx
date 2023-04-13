import { FC, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRole'
import { authService } from '@/graphql/auth/authService'
import { DELETE_LANGUAGE } from '@/graphql/languages/deleteLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { LanguageUpdateModal } from '@/pages/LanguagesPage/LanguageUpdateModal/LanguageUpdateModal'

import { ILanguageDropdownProps } from './LanguageDropdown.interfaces'

export const LanguageDropdown: FC<ILanguageDropdownProps> = ({ language }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [open, setOpen] = useState<boolean>(false)

  const [deleteLanguageMutation] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  })

  const handleLanguageDelete = (): void => {
    deleteLanguageMutation({
      variables: { id: language.id }
    })
  }

  const handleModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={handleModalClose}>Update</MenuItem>
          <MenuItem onClick={handleLanguageDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {open && <LanguageUpdateModal language={language} onClose={handleModalClose} />}
    </Box>
  )
}
