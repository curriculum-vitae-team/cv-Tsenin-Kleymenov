import { FC } from 'react'

import { SkillItem } from '@/components/containers/SkillItem/SkillItem'

import { ISkillRowProps } from './SkillRow.interfaces'
import { CategoryTitle, SkillCard } from './SkillRow.styles'

export const SkillRow: FC<ISkillRowProps> = ({ category, skills }) => {
  return (
    <SkillCard>
      <CategoryTitle>{category}</CategoryTitle>
      <div>
        {skills.map(skill => {
          return <SkillItem key={skill.name} skill={skill} />
        })}
      </div>
    </SkillCard>
  )
}
