import { FC } from 'react'

import { getFirstChars } from '@/utils/getFirstChar'

import { IUserAvatarProps } from './UserAvatar.interfaces'
import { Avatar } from './UserAvatar.styles'

export const UserAvatar: FC<IUserAvatarProps> = ({ handleClick, user }) => {
  return (
    <>
      {user?.profile.avatar ? (
        <Avatar onClick={handleClick} src={user?.profile.avatar} />
      ) : (
        <Avatar>{getFirstChars(user?.profile?.full_name || user?.email)}</Avatar>
      )}
    </>
  )
}
