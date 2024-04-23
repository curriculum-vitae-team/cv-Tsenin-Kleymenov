import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_SKILL } from '@/graphql/skill/deleteSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { SkillUpdateModal } from '@/pages/SkillsPage/SkillUpdateModal/SkillUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { ISkillDropdownProps } from './SkillDropdown.interfaces'

export const SkillDropdown: FC<ISkillDropdownProps> = ({ skill }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [deleteSkillMutation] = useMutation(DELETE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })

  const { t } = useTranslation()

  const handleSkillDelete = (): void => {
    deleteSkillMutation({
      variables: {
        skill: {
          skillId: skill.id
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
          <MenuItem onClick={handleSkillDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <SkillUpdateModal skill={skill} onClose={toggleVisibility} />}
    </Box>
  )
}
