import { ICV } from '@/graphql/interfaces/ICV.interfaces'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'
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
export interface ILanguagesResult {
  languages: ILanguage[]
}

export interface ISkillsResult {
  skills: ISkill[]
}

export interface IProjectsResult {
  projects: IProject[]
}

export interface ICVsResult {
  cvs: ICV[]
}
