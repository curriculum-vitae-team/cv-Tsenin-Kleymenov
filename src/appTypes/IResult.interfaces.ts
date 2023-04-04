import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IUserResult {
  user: IUser
}

export interface IDepartmentResult {
  departments: IDepartment[]
}

export interface IPositionResult {
  positions: IPosition[]
}

export interface ILanguagesResult {
  languages: ILanguage[]
}

export interface ISkillsResult {
  skills: ISkill[]
}
