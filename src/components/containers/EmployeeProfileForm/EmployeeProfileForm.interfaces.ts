import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IProfileFormValues {
  firstName: string
  lastName: string
  department: string
  position: string
}

export interface IEmployeeProfileFormProps {
  currentUser?: IUser
}
