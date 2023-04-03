import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Container, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { SkillRow } from '@/components/views/SkillRow/SkillRow'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'
import { USER } from '@/graphql/user/userQuery'

import { SkillsModal } from './SkillsModal/SkillsModal'

export const EmployeeSkillsProfile: FC = () => {
  const [open, setOpen] = useState(false)
  const { id: userId } = useParams()
  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const masteryArrayWithSkills = MASTERY_ARRAY.map(mastery => {
    return {
      name: mastery.name,
      [mastery.name]: userData?.user?.profile?.skills.filter(
        skill => skill.mastery === mastery.name
      )
    }
  })

  const handleSkillModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth="lg">
      <Button
        sx={{ maxWidth: 170, my: 3, alignSelf: 'flex-end' }}
        variant="contained"
        onClick={handleSkillModalClose}
      >
        + Add skills
      </Button>
      <Divider />
      {userData?.user?.profile.skills.length ? (
        masteryArrayWithSkills.map(item => (
          <SkillRow key={item.name} filteredSkills={item[item.name] as ISkillMastery[]} />
        ))
      ) : (
        <Typography sx={{ my: 2 }} variant="h5">
          You don't have any skills
        </Typography>
      )}
      {open && (
        <SkillsModal open={open} userData={userData?.user} handleClose={handleSkillModalClose} />
      )}
    </Container>
  )
}
