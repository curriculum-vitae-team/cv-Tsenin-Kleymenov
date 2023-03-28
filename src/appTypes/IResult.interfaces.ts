import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IUserResult {
  user: IUser
}

export interface IUserResult {
  user: IUser
}

export interface IDepartmentResult {
  departments: IDepartment[]
}

export interface IPositionResult {
  positions: IPosition[]
}
