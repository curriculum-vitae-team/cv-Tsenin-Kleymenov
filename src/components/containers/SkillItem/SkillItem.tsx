import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Typography } from '@mui/material'

import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { MASTERY_COLORS } from '@/constants/mastery'
import { DELETE_PROFILE_SKILL } from '@/graphql/skill/profile_skill/deleteProfileSkillMutation'
import { useUser } from '@/hooks/useUser'

import { ISkillItemProps } from './SkillItem.interfaces'
import { MasteryBox, SkillBox, SkillItemContainer } from './SkillItem.styles'

export const SkillItem: FC<ISkillItemProps> = ({ skillName, skillMastery }) => {
  const { id: userId } = useParams()
  const { t } = useTranslation()
  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

  const [deleteProfileSkill, { loading: userLoading }] = useMutation(DELETE_PROFILE_SKILL)

  const handleDelete = (skill_name: string): void => {
    deleteProfileSkill({
      variables: {
        skill: {
          userId,
          name: skill_name
        }
      }
    })
  }

  return (
    <SkillItemContainer>
      <SkillBox>
        <Typography fontSize="24px">{skillName}</Typography>
        <MasteryBox mastery_color={MASTERY_COLORS[skillMastery]}>
          <Typography fontSize="15px">{t(skillMastery)}</Typography>
        </MasteryBox>
      </SkillBox>
      {(userCheck || isAdmin) && (
        <Box onClick={() => handleDelete(skillName)}>
          <LoadingOverlay active={userLoading} position="static">
            <ClearIcon sx={{ '&:hover': { cursor: 'pointer' } }} />
          </LoadingOverlay>
        </Box>
      )}
    </SkillItemContainer>
  )
}
