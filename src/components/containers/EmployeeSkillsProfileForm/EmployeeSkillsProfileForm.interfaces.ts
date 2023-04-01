export enum FORM_PROFILE_SKILLS_KEYS {
  skills = 'skills',
  mastery = 'mastery'
}

export interface IProfileSkillFormValues {
  [FORM_PROFILE_SKILLS_KEYS.skills]: string
  [FORM_PROFILE_SKILLS_KEYS.mastery]: string
}
