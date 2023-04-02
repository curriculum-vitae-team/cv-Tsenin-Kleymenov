export enum FORM_PROFILE_SKILLS_KEYS {
  skills = 'skills',
  mastery = 'mastery'
}

export enum SKILLS_MASTERY {
  NOVICE = 'novice',
  ADVANCED = 'advanced',
  COMPETENT = 'competent',
  PROFICIENT = 'proficient',
  EXPERT = 'expert'
}

export interface IProfileSkillFormValues {
  [FORM_PROFILE_SKILLS_KEYS.skills]: string
  [FORM_PROFILE_SKILLS_KEYS.mastery]: string
}
