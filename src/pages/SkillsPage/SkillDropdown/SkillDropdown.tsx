import { FC, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRole'
import { authService } from '@/graphql/auth/authService'
import { DELETE_SKILL } from '@/graphql/skills/deleteSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { SkillUpdateModal } from '@/pages/SkillsPage/SkillUpdateModal/SkillUpdateModal'

import { ISkillDropdownProps } from './SkillDropdown.interfaces'

export const SkillDropdown: FC<ISkillDropdownProps> = ({ skill }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [open, setOpen] = useState<boolean>(false)

  const [deleteSkillMutation] = useMutation(DELETE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })

  const handleSkillDelete = (): void => {
    deleteSkillMutation({
      variables: { id: skill.id }
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
          <MenuItem onClick={handleSkillDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {open && <SkillUpdateModal skill={skill} onClose={handleModalClose} />}
    </Box>
  )
}
