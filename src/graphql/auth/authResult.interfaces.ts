import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IAuthResult {
  user: IUser
  access_token: string
}

export interface ILoginResult {
  login: IAuthResult
}

export interface ISignUpResult {
  signup: IAuthResult
}
