import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { Loader } from '@/components/views/Loader/Loader'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { createSkillsArray } from '@/utils/createSkillsArray'
import { setMasteryColor } from '@/utils/setMasteryColor'

import { ISkillItemProps } from './SkillItem.interfaces'
import { MasteryBox, SkillBox } from './SkillItem.styles'

export const SkillItem: FC<ISkillItemProps> = ({ skillName, skillMastery }) => {
  const { id: userId } = useParams()
  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: USER, variables: { id: userId } }]
  })

  const handleDelete = (skill_name: string, mastery: string): void => {
    updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            skills: createSkillsArray(userData?.user.profile.skills).filter(
              elem => elem.skill_name !== skill_name || elem.mastery !== mastery
            )
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || ''
        }
      }
    })
  }

  return (
    <Box sx={{ m: 1, display: 'inline-flex', alignItems: 'center' }}>
      <SkillBox>
        <Typography>{skillName}</Typography>
        <MasteryBox mastery_color={setMasteryColor(skillMastery)}>
          <Typography>{skillMastery}</Typography>
        </MasteryBox>
      </SkillBox>
      <Box onClick={() => handleDelete(skillName, skillMastery)}>
        {userLoading ? (
          <Loader
            size={20}
            sx={{ position: 'static', backgroundColor: 'white', borderRadius: '50%' }}
            color="secondary"
          />
        ) : (
          <ClearIcon sx={{ '&:hover': { cursor: 'pointer' } }} />
        )}
      </Box>
    </Box>
  )
}
