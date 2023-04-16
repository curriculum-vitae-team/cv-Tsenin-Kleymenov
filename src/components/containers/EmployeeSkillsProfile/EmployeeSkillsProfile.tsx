import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { SkillRow } from '@/components/views/SkillRow/SkillRow'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { authService } from '@/graphql/auth/authService'
import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import { SkillsModal } from './SkillsModal/SkillsModal'

export const EmployeeSkillsProfile: FC = () => {
  const { id: userId } = useParams()
  const { t } = useTranslation()
  const [isVisible, toggleVisibility] = useBooleanState()
  const user = useReactiveVar(authService.user$)
  const userCheck = userId === user?.id

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const masteryObject = MASTERY_ARRAY.reduce((acc: { [key: string]: ISkillMastery[] }, item) => {
    acc[item.name] =
      userData?.user?.profile?.skills.filter(skill => skill.mastery === item.name) || []

    return acc
  }, {})

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {userCheck && (
        <Button
          sx={{ maxWidth: 170, alignSelf: 'flex-end' }}
          variant="contained"
          onClick={toggleVisibility}
        >
          Add skills
        </Button>
      )}
      <Divider sx={{ my: 2 }} />
      {userData?.user?.profile.skills.length ? (
        Object.keys(masteryObject).map(key => {
          return <SkillRow key={key} skills={masteryObject[key]} />
        })
      ) : (
        <Typography sx={{ my: 2 }} variant="h5">
          {t('No skills')}
        </Typography>
      )}
      {isVisible && <SkillsModal userData={userData?.user} onClose={toggleVisibility} />}
    </Box>
  )
}
