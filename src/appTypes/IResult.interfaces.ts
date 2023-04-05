import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IUserResult {
  user: IUser
}

export interface IUsersResult {
  users: IUser[]
}

export interface IDepartmentResult {
  departments: IDepartment[]
}

export interface IPositionResult {
  positions: IPosition[]
}

export interface IProjectsResult {
  projects: IProject[]
}
