import { SKILLS_MASTERY } from '@/components/containers/EmployeeSkillsProfile/EmployeeSkillsProfile.interfaces'

interface IMastery {
  id: string
  name: string
}

export const MASTERY_ARRAY: IMastery[] = [
  { id: SKILLS_MASTERY.NOVICE, name: SKILLS_MASTERY.NOVICE },
  { id: SKILLS_MASTERY.ADVANCED, name: SKILLS_MASTERY.ADVANCED },
  { id: SKILLS_MASTERY.COMPETENT, name: SKILLS_MASTERY.COMPETENT },
  { id: SKILLS_MASTERY.PROFICIENT, name: SKILLS_MASTERY.PROFICIENT },
  { id: SKILLS_MASTERY.EXPERT, name: SKILLS_MASTERY.EXPERT }
]

interface IMasteryColors {
  [key: string]: string
}

export const MASTERY_COLORS: IMasteryColors = {
  [SKILLS_MASTERY.NOVICE]: 'lightblue',
  [SKILLS_MASTERY.ADVANCED]: 'green',
  [SKILLS_MASTERY.COMPETENT]: 'gold',
  [SKILLS_MASTERY.PROFICIENT]: 'orange',
  [SKILLS_MASTERY.EXPERT]: 'pink'
}
