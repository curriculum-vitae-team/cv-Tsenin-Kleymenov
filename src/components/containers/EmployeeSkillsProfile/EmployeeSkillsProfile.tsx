import { FC, useState } from 'react'
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

import { SkillsModal } from './SkillsModal/SkillsModal'

export const EmployeeSkillsProfile: FC = () => {
  const [open, setOpen] = useState(false)
  const { id: userId } = useParams()
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

  const handleSkillModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {userCheck && (
        <Button
          sx={{ maxWidth: 170, alignSelf: 'flex-end' }}
          variant="contained"
          onClick={handleSkillModalClose}
        >
          + Add skills
        </Button>
      )}
      <Divider sx={{ my: 2 }} />
      {userData?.user?.profile.skills.length ? (
        Object.keys(masteryObject).map(key => {
          return <SkillRow key={key} skills={masteryObject[key]} />
        })
      ) : (
        <Typography sx={{ my: 2 }} variant="h5">
          You don't have any skills
        </Typography>
      )}
      {open && (
        <SkillsModal userData={userData?.user} handleClose={handleSkillModalClose} />
      )}
    </Box>
  )
}
