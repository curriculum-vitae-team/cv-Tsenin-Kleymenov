import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface ICVsModalProps extends IBaseModalProps {
  currentCVData?: ICV | null
  userData?: IUser
}

export enum FORM_PROFILE_CVS_KEYS {
  name = 'name',
  description = 'description',
  template = 'template'
}

export interface IProfileCVsFormValues {
  [FORM_PROFILE_CVS_KEYS.name]: string
  [FORM_PROFILE_CVS_KEYS.description]: string
  [FORM_PROFILE_CVS_KEYS.template]: boolean
}
