import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { SkillRow } from '@/components/views/SkillRow/SkillRow'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { SkillsModal } from './SkillsModal/SkillsModal'

export const EmployeeSkillsProfile: FC = () => {
  const { id: userId } = useParams()
  const [user, isAdmin] = useUser()
  const userCheck = userId === user?.id

  const [isVisible, toggleVisibility] = useBooleanState()

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const { t } = useTranslation()

  const masteryObject = MASTERY_ARRAY.reduce((acc: { [key: string]: ISkillMastery[] }, item) => {
    acc[item.name] =
      userData?.user?.profile?.skills.filter(skill => skill.mastery === item.name) || []

    return acc
  }, {})

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {(userCheck || isAdmin) && (
        <Button
          sx={{ maxWidth: 170, alignSelf: 'flex-end' }}
          variant="contained"
          onClick={toggleVisibility}
        >
          {t('Add skills')}
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
