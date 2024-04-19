import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { ICVSkillsResult } from '@/appTypes/IResult.interfaces'
import { AddAction } from '@/components/containers/EmployeeSkillsProfile/EmployeeSkillsProfile.styles'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { SkillRow } from '@/components/views/SkillRow/SkillRow'
import { CV_SKILLS } from '@/graphql/cv/cvSkills/cvSkillsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { groupedSkills } from '@/utils/groupData'

import { CVSkillsModal } from './CVSkillsModal/CVSkillsModal'

export const CVSkillsPage: FC = () => {
  const { id } = useParams<string>()

  const { t } = useTranslation()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { loading: loadingCvSkills, data: skillsData } = useQuery<ICVSkillsResult>(CV_SKILLS, {
    variables: { id }
  })

  const group = groupedSkills(skillsData?.cv.skills ?? [])

  return (
    <LoadingOverlay active={loadingCvSkills}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* {(userCheck || isAdmin) && ( */}
        <AddAction variant="contained" onClick={toggleVisibility}>
          {t('addSkill')}
        </AddAction>
        {/* )} */}
        <Divider sx={{ my: 2 }} />
        {skillsData?.cv.skills.length ? (
          Object.entries(group).map(([category, skills], index) => {
            return <SkillRow key={`${category}-${index}`} category={category} skills={skills} />
          })
        ) : (
          <Typography sx={{ my: 2 }} variant="h5">
            {t('noSkills')}
          </Typography>
        )}
        {skillsData && isVisible && <CVSkillsModal cv={skillsData.cv} onClose={toggleVisibility} />}
      </Box>
    </LoadingOverlay>
  )
}
