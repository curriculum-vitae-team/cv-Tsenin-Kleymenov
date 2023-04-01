import { FC } from 'react'
import { Box } from '@mui/material'

import { SkillItem } from '../../containers/SkillItem/SkillItem'

import { ISkillRowProps } from './SkillRow.interfaces'

export const SkillRow: FC<ISkillRowProps> = ({ skills, mastery }) => {
  return (
    <Box>
      {skills &&
        skills
          .filter(item => item.mastery === mastery)
          .map(item => (
            <SkillItem
              key={item.skill_name}
              skillName={item.skill_name}
              skillMastery={item.mastery}
            />
          ))}
    </Box>
  )
}
