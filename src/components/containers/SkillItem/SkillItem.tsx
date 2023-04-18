import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { MASTERY_COLORS } from '@/constants/mastery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { useUser } from '@/hooks/useUser'
import { createSkillsArray } from '@/utils/createSkillsArray'

import { ISkillItemProps } from './SkillItem.interfaces'
import { MasteryBox, SkillBox, SkillItemContainer } from './SkillItem.styles'

export const SkillItem: FC<ISkillItemProps> = ({ skillName, skillMastery }) => {
  const { id: userId } = useParams()
  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

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
    <SkillItemContainer>
      <SkillBox>
        <Typography>{skillName}</Typography>
        <MasteryBox mastery_color={MASTERY_COLORS[skillMastery]}>
          <Typography>{skillMastery}</Typography>
        </MasteryBox>
      </SkillBox>
      {(userCheck || isAdmin) && (
        <Box onClick={() => handleDelete(skillName, skillMastery)}>
          <LoadingOverlay active={userLoading} position="static">
            <ClearIcon sx={{ '&:hover': { cursor: 'pointer' } }} />
          </LoadingOverlay>
        </Box>
      )}
    </SkillItemContainer>
  )
}
