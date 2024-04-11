import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export const createSkillsArray = (data?: ISkillMastery[]): ISkillMastery[] => {
  if (data) {
    return data.map(({ name, mastery, category }) => {
      return { name, mastery, category }
    })
  }
  return []
}
