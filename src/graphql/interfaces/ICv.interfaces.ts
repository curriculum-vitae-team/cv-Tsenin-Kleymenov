import { ILanguageProficiency } from './ILanguageProficiency.interfaces'
import { IProject } from './IProject.interfaces'
import { ISkillMastery } from './ISkillMastery.interfaces'
import { IUser } from './IUser.interfaces'

export interface ICVProject {
  id: string
  project: IProject
  name: string
  internal_name?: string
  description: string
  domain: string
  start_date: string
  end_date?: string
  team_size: number
  roles: string
  responsibilities: string
}

export interface ICV {
  id: string
  created_at: string
  name: string
  education: string
  description: string
  user: Omit<IUser, 'cvs'>
  projects: ICVProject[]
  skills: ISkillMastery[]
  languages: ILanguageProficiency[]
}
