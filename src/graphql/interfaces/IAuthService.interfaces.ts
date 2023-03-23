import { ReactiveVar } from '@apollo/client'

import { IUser } from './IUser.interfaces'

export interface IAuthService {
  user$: ReactiveVar<IUser | null>
  access_token$: ReactiveVar<string>
  addUserToStorage: (user: IUser, access_token: string) => void
  clearStorage: () => void
}
