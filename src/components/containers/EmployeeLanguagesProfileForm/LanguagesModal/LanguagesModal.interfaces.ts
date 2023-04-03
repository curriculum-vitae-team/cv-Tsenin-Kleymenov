import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface ILanguagesModalProps {
  userData?: IUser
  open: boolean
  handleClose: () => void
}

export enum FORM_PROFILE_LANGUAGES_KEYS {
  languages = 'languages',
  proficiency = 'proficiency'
}

export interface IProfileLanguagesFormValues {
  [FORM_PROFILE_LANGUAGES_KEYS.languages]: string
  [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: string
}

