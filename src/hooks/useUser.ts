import { useReactiveVar } from '@apollo/client'

import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export const useUser = (): { user: IUser | null; isAdmin: boolean } => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  return { user, isAdmin } as const
}
