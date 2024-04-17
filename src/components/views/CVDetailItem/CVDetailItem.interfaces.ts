import { ICV } from '@/graphql/interfaces/ICv.interfaces'

export interface ICVDetailItemProps {
  CVData?: ICV
}
export enum FORM_PROFILE_CVS_KEYS {
  name = 'name',
  education = 'education',
  description = 'description'
}

export interface ICVDetailsFormValues {
  [FORM_PROFILE_CVS_KEYS.name]: string
  [FORM_PROFILE_CVS_KEYS.education]: string
  [FORM_PROFILE_CVS_KEYS.description]: string
}
