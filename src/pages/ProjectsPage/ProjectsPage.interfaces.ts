export enum FORM_PROJECT_KEYS {
  name = 'name',
  internal_name = 'internal_name',
  description = 'description',
  domain = 'domain',
  start_date = 'start_date',
  end_date = 'end_date',
  team_size = 'team_size'
}

export interface IProjectFormValues {
  [FORM_PROJECT_KEYS.name]: string
  [FORM_PROJECT_KEYS.internal_name]: string
  [FORM_PROJECT_KEYS.description]: string
  [FORM_PROJECT_KEYS.domain]: string
  [FORM_PROJECT_KEYS.start_date]: string
  [FORM_PROJECT_KEYS.end_date]: string
  [FORM_PROJECT_KEYS.team_size]: number
}
