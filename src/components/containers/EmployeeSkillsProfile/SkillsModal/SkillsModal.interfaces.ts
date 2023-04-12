import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface ISkillsModalProps extends IBaseModalProps {
  userData?: IUser
}

export enum FORM_PROFILE_SKILLS_KEYS {
  skills = 'skills',
  mastery = 'mastery'
}

export interface IProfileSkillFormValues {
  [FORM_PROFILE_SKILLS_KEYS.skills]: string
  [FORM_PROFILE_SKILLS_KEYS.mastery]: string
}
