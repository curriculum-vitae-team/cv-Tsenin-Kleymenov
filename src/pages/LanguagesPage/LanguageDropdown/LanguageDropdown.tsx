import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { LanguageUpdateModal } from '@/pages/LanguagesPage/LanguageUpdateModal/LanguageUpdateModal'

import { useDeleteLanguage } from '../hook/useDeleteLanguage'

import { ILanguageDropdownProps } from './LanguageDropdown.interfaces'

export const LanguageDropdown: FC<ILanguageDropdownProps> = ({ language }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { t } = useTranslation()

  const { isDelete, toggleDelete } = useDeleteModal()

  const { onSubmit, loading: loadingLanguage } = useDeleteLanguage(language.id, toggleDelete)

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
          <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <LanguageUpdateModal language={language} onClose={toggleVisibility} />}
      {isDelete && (
        <DeleteModal
          isLoading={loadingLanguage}
          title={t('confirmRemoveLanguage')}
          message={t('confirmRemoveLanguageMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </Box>
  )
}
