import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface ILanguagesModalProps extends IBaseModalProps {
  userData?: IUser
}

export enum FORM_PROFILE_LANGUAGES_KEYS {
  languages = 'languages',
  proficiency = 'proficiency'
}

export interface IProfileLanguagesFormValues {
  [FORM_PROFILE_LANGUAGES_KEYS.languages]: string
  [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: string
}
