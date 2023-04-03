import { FC } from 'react'
import { Box } from '@mui/material'

import { SkillItem } from '@/components/containers/SkillItem/SkillItem'

import { ISkillRowProps } from './SkillRow.interfaces'

export const SkillRow: FC<ISkillRowProps> = ({ filteredSkills }) => {
  return (
    <Box>
      {filteredSkills &&
        filteredSkills.map(item => (
          <SkillItem
            key={item.skill_name}
            skillName={item.skill_name}
            skillMastery={item.mastery}
          />
        ))}
    </Box>
  )
}
