import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export interface ISkillGroup {
  [category: string]: string[]
}

export const groupedSkills = (skills: ISkillMastery[]): ISkillGroup => {
  return skills.reduce((acc, cur) => {
    const category = cur.category || 'Other'

    if (!acc[category]) {
      acc[category] = []
    }

    acc[category].push(cur.name)

    return acc
  }, {} as ISkillGroup)
}
