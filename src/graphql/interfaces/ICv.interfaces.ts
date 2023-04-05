import { ILanguageProficiency } from './ILanguageProficiency.interfaces'
import { IProject } from './IProject.interfaces'
import { ISkillMastery } from './ISkillMastery.interfaces'
import { IUser } from './IUser.interfaces'

export interface ICV {
  id: string
  created_at: string
  name: string
  description: string
  user: Omit<IUser, 'cvs'>
  projects: IProject[]
  skills: ISkillMastery[]
  languages: ILanguageProficiency[]
  is_template: boolean
}
