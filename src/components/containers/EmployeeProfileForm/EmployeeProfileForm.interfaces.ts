import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export enum FORM_PROFILE_KEYS {
  firstName = 'firstName',
  lastName = 'lastName',
  position = 'position',
  department = 'department'
}

export interface IProfileFormValues {
  [FORM_PROFILE_KEYS.firstName]: string
  [FORM_PROFILE_KEYS.lastName]: string
  [FORM_PROFILE_KEYS.position]: string
  [FORM_PROFILE_KEYS.department]: string
}

export interface IEmployeeProfileFormProps {
  currentUser?: IUser
}
