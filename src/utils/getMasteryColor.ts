import { SKILLS_MASTERY } from '@/components/containers/EmployeeSkillsProfile/EmployeeSkillsProfile.interfaces'

export const getMasteryColor = (
  mastery: string
): 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' => {
  switch (mastery) {
    case SKILLS_MASTERY.NOVICE: {
      return 'secondary'
    }

    case SKILLS_MASTERY.ADVANCED: {
      return 'info'
    }

    case SKILLS_MASTERY.COMPETENT: {
      return 'success'
    }

    case SKILLS_MASTERY.PROFICIENT: {
      return 'warning'
    }

    case SKILLS_MASTERY.EXPERT:
    default: {
      return 'primary'
    }
  }
}
