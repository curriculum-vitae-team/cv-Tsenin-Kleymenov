import { ICV } from './ICv.interfaces'
import { IDepartment } from './IDepartment.interfaces'
import { IPosition } from './IPosition.interfaces'
import { IProfile } from './IProfile.interfaces'

export interface IUser {
  id: string
  created_at: string
  email: string
  is_verified?: boolean
  profile: IProfile
  cvs?: ICV[]
  department?: IDepartment
  department_name?: string
  position?: IPosition
  position_name?: string
  role: string
}
