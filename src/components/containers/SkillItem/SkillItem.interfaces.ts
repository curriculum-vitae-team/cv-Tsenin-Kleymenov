import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export interface ISkillItemProps {
  skill: ISkillMastery
}

export interface IBadgeStyled {
  mastery_color?: string
}
