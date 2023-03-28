import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export const getUserProfilePath = (route: string, user: IUser | null | undefined): string => {
  return route.includes(':id') ? route.replace(':id', user?.id as string) : route
}
