import { IUser } from '../interfaces/IUser.interfaces'

export interface IAuthResult {
  user: IUser
  access_token: string
}

export interface ILoginResult {
  login: IAuthResult
}

export interface ISignupResult {
  signup: IAuthResult
}
