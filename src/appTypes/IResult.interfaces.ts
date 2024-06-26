import { ICV, ICVProject } from '@/graphql/interfaces/ICv.interfaces'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'
import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'
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

export interface ICVProjectsResult {
  projects: ICVProject[]
}

export interface IProjectResult {
  project: IProject
}

export interface ILanguagesResult {
  languages: ILanguage[]
}

export interface ISkillsResult {
  skills: ISkill[]
}

export interface ICVsResult {
  cvs: ICV[]
}

export interface ICVResult {
  cv: ICV
}

export interface ISkillCategories {
  skillCategories: string[]
}

export interface ICVSkillsResult {
  cv: {
    id: string
    user?: {
      id: string
    }
    skills: ISkillMastery[]
  }
}

export interface IProfileResult {
  user: {
    id: string
    email: string
    profile: {
      id: string
      full_name: string
      avatar: string
    }
  }
}
