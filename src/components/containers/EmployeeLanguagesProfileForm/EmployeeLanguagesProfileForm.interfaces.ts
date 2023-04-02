export enum FORM_PROFILE_LANGUAGES_KEYS {
  languages = 'languages',
  proficiency = 'proficiency'
}

export enum PROFICIENCY {
  A1 = 'a1',
  A2 = 'a2',
  B1 = 'b1',
  B2 = 'b2',
  C1 = 'c1',
  C2 = 'c2'
}

export interface IProfileLanguagesFormValues {
  [FORM_PROFILE_LANGUAGES_KEYS.languages]: string
  [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: string
}
