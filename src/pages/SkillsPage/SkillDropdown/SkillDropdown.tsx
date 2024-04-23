import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { SkillUpdateModal } from '@/pages/SkillsPage/SkillUpdateModal/SkillUpdateModal'

import { useDeleteSkill } from '../hook/useDeleteSkill'

import { ISkillDropdownProps } from './SkillDropdown.interfaces'

export const SkillDropdown: FC<ISkillDropdownProps> = ({ skill }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { t } = useTranslation()

  const { isDelete, toggleDelete } = useDeleteModal()

  const { onSubmit, loading: loadingSkill } = useDeleteSkill(skill.id, toggleDelete)

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
          <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <SkillUpdateModal skill={skill} onClose={toggleVisibility} />}
      {isDelete && (
        <DeleteModal
          isLoading={loadingSkill}
          title={t('confirmRemoveSkill')}
          message={t('confirmRemoveSkillMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </Box>
  )
}
