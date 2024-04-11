import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'

export interface ICVDetailsModalProps extends IBaseModalProps {
  CVData?: ICV | null
}

export enum FORM_PROFILE_CVS_KEYS {
  name = 'name',
  description = 'description'
}

export interface ICVDetailsFormValues {
  [FORM_PROFILE_CVS_KEYS.name]: string
  [FORM_PROFILE_CVS_KEYS.description]: string
}
