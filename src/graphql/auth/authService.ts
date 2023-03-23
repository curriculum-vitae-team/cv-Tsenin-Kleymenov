import { makeVar } from '@apollo/client'

import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys'
import { IAuthService } from '@/graphql/interfaces/IAuthService.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

const userVar = makeVar<IUser | null>(
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user) ?? 'null')
)
const accessTokenVar = makeVar<string>(localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken) || '')

const addUserToStorage = (user: IUser, access_token: string): void => {
  userVar(user)
  accessTokenVar(access_token)
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user))
  localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, access_token)
}

const clearStorage = (): void => {
  userVar(null)
  accessTokenVar('')
  localStorage.removeItem(LOCAL_STORAGE_KEYS.user)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken)
}

export const authService: IAuthService = {
  user$: userVar,
  access_token$: accessTokenVar,
  addUserToStorage,
  clearStorage
}
