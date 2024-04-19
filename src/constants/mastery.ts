import { SKILLS_MASTERY } from '@/components/containers/EmployeeSkillsProfile/EmployeeSkillsProfile.interfaces'

interface IMastery {
  id: string
  name: string
  value?: number
}

export const MASTERY_ARRAY: IMastery[] = [
  { id: SKILLS_MASTERY.NOVICE, name: SKILLS_MASTERY.NOVICE, value: 20 },
  { id: SKILLS_MASTERY.ADVANCED, name: SKILLS_MASTERY.ADVANCED, value: 40 },
  { id: SKILLS_MASTERY.COMPETENT, name: SKILLS_MASTERY.COMPETENT, value: 60 },
  { id: SKILLS_MASTERY.PROFICIENT, name: SKILLS_MASTERY.PROFICIENT, value: 80 },
  { id: SKILLS_MASTERY.EXPERT, name: SKILLS_MASTERY.EXPERT, value: 100 }
]

interface IMasteryColors {
  [key: string]: string
}

export const MASTERY_COLORS: IMasteryColors = {
  [SKILLS_MASTERY.NOVICE]: '#a90295',
  [SKILLS_MASTERY.ADVANCED]: '#003eb0',
  [SKILLS_MASTERY.COMPETENT]: '#1be800 ',
  [SKILLS_MASTERY.PROFICIENT]: '#ff9500',
  [SKILLS_MASTERY.EXPERT]: '#e80029'
}
