import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { SkillRow } from '@/components/views/SkillRow/SkillRow'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { groupedSkills } from '@/utils/groupData'

import { SkillsModal } from './SkillsModal/SkillsModal'
import { AddAction } from './EmployeeSkillsProfile.styles'

export const EmployeeSkillsProfile: FC = () => {
  const { id: userId } = useParams()
  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

  const { isVisible, toggleVisibility } = useBooleanState()

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const { t } = useTranslation()

  const group = groupedSkills(userData?.user?.profile.skills ?? [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {(userCheck || isAdmin) && (
        <AddAction variant="contained" onClick={toggleVisibility}>
          {t('addSkill')}
        </AddAction>
      )}
      <Divider sx={{ my: 2 }} />
      {userData?.user?.profile.skills.length ? (
        Object.entries(group).map(([category, skills], index) => {
          return <SkillRow key={`${category}-${index}`} category={category} skills={skills} />
        })
      ) : (
        <Typography sx={{ my: 2 }} variant="h5">
          {t('noSkills')}
        </Typography>
      )}
      {isVisible && <SkillsModal userData={userData?.user} onClose={toggleVisibility} />}
    </Box>
  )
}
