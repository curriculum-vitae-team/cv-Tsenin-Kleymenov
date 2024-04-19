import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export interface ISkillRowProps {
  category?: string
  skills: ISkillMastery[]
}
