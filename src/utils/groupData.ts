import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export interface ISkillGroup {
  [category: string]: ISkillMastery[]
}

export const groupedSkills = (skills: ISkillMastery[]): ISkillGroup => {
  return skills.reduce((acc, cur) => {
    const category = cur.category || 'Other'

    if (!acc[category]) {
      acc[category] = []
    }

    acc[category].push(cur)

    return acc
  }, {} as ISkillGroup)
}
