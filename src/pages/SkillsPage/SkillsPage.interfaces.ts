export enum FORM_SKILL_KEYS {
  name = 'name',
  category = 'category'
}

export interface ISkillFormValues {
  [FORM_SKILL_KEYS.name]: string
  [FORM_SKILL_KEYS.category]: string
}
