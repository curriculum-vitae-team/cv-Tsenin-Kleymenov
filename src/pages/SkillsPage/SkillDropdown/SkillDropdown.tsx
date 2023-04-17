import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_SKILL } from '@/graphql/skills/deleteSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { SkillUpdateModal } from '@/pages/SkillsPage/SkillUpdateModal/SkillUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { ISkillDropdownProps } from './SkillDropdown.interfaces'

export const SkillDropdown: FC<ISkillDropdownProps> = ({ skill }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const { t } = useTranslation()
  const [isVisible, toggleVisibility] = useBooleanState()

  const [deleteSkillMutation] = useMutation(DELETE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })

  const handleSkillDelete = (): void => {
    deleteSkillMutation({
      variables: { id: skill.id }
    })

    toastMessage('Successfully deleted', TOAST_TYPES.success)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('Update')}</MenuItem>
          <MenuItem onClick={handleSkillDelete}>{t('Delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <SkillUpdateModal skill={skill} onClose={toggleVisibility} />}
    </Box>
  )
}
