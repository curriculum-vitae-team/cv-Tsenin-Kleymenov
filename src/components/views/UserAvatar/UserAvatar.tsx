import { FC } from 'react'

import { useUser } from '@/hooks/useUser'
import { getFirstChars } from '@/utils/getFirstChar'

import { IUserAvatarProps } from './UserAvatar.interfaces'
import { Avatar } from './UserAvatar.styles'

export const UserAvatar: FC<IUserAvatarProps> = ({ profile }) => {
  const { user } = useUser()
  return (
    <Avatar src={profile?.avatar ?? ''}>{getFirstChars(profile?.full_name ?? user?.email)}</Avatar>
  )
}
