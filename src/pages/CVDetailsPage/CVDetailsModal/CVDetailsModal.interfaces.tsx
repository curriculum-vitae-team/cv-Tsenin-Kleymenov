import { ICV } from '@/graphql/interfaces/ICV.interfaces'

export interface ICVDetailsModalProps {
  CVData?: ICV | null
  handleClose: () => void
}

export enum FORM_PROFILE_CVS_KEYS {
  name = 'name',
  description = 'description',
  template = 'template'
}

export interface ICVDetailsFormValues {
  [FORM_PROFILE_CVS_KEYS.name]: string
  [FORM_PROFILE_CVS_KEYS.description]: string
  [FORM_PROFILE_CVS_KEYS.template]: boolean
}
