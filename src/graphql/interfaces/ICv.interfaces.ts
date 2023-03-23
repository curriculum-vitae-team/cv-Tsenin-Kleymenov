import { ILanguageProficiency } from './ILanguageProficiency.interfaces'
import { IProject } from './IProject.interfaces'
import { ISkillMastery } from './ISkillMastery.interfaces'
import { IUser } from './IUser.interfaces'

export interface ICv {
  id: string
  created_at: string
  name: string
  description: string
  user: Omit<IUser, 'cvs'>
  projects: Array<IProject>
  skills: Array<ISkillMastery>
  languages: Array<ILanguageProficiency>
  is_template: boolean
}
