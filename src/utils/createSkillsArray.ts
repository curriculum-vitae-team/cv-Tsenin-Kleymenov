import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export const createSkillsArray = (data: ISkillMastery[] | undefined): ISkillMastery[] => {
  if (data) {
    return data.map(({ skill_name, mastery }) => {
      return { skill_name, mastery }
    })
  }
  return []
}
