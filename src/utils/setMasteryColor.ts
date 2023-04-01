import { SKILLS_MASTERY } from '@/components/containers/EmployeeSkillsProfileForm/EmployeeSkillsProfileForm.styles'
import { theme } from '@/theme/theme'

export const setMasteryColor = (mastery: string): string => {
  switch (mastery) {
    case SKILLS_MASTERY.NOVICE:
      return 'lightblue'
    case SKILLS_MASTERY.ADVANCED:
      return 'green'
    case SKILLS_MASTERY.COMPETENT:
      return 'gold'
    case SKILLS_MASTERY.PROFICIENT:
      return 'orange'
    case SKILLS_MASTERY.EXPERT:
      return 'pink'
    default:
      return theme.palette.primary.main
  }
}
