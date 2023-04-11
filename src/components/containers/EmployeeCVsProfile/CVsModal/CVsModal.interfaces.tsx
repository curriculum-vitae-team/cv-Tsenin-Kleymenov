import { ICV } from '@/graphql/interfaces/ICV.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface ICVsModalProps {
  currentCVData: ICV | null
  userData?: IUser
  open: boolean
  handleClose: () => void
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