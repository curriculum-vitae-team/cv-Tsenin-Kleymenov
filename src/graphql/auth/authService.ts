import { makeVar } from '@apollo/client'

import { LocalStorageKeys } from '@/constants/localStorageKeys'
import { IAuthService } from '@/graphql/interfaces/IAuthService.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

const userVar = makeVar<IUser | null>(
  JSON.parse(localStorage.getItem(LocalStorageKeys.User) ?? 'null')
)
const accessTokenVar = makeVar<string>(localStorage.getItem(LocalStorageKeys.AccessToken) || '')

const addUserToStorage = (user: IUser, access_token: string): void => {
  userVar(user)
  accessTokenVar(access_token)
  localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user))
  localStorage.setItem(LocalStorageKeys.AccessToken, access_token)
}

const clearStorage = (): void => {
  userVar(null)
  accessTokenVar('')
  localStorage.removeItem(LocalStorageKeys.User)
  localStorage.removeItem(LocalStorageKeys.AccessToken)
}

export const authService: IAuthService = {
  user$: userVar,
  access_token$: accessTokenVar,
  addUserToStorage,
  clearStorage
}
