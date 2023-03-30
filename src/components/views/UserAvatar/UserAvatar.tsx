import { FC } from 'react'
import { IconButton, Tooltip } from '@mui/material'

import { getFirstChars } from '@/utils/getFirstChar'

import { IUserAvatarProps } from './UserAvatar.interfaces'
import { Avatar } from './UserAvatar.styles'

export const UserAvatar: FC<IUserAvatarProps> = ({ handleClick, user }) => {
  return (
    <Tooltip title="User account ">
      {user?.profile.avatar ? (
        <IconButton onClick={handleClick} sx={{ mx: 2, width: 40, height: 40 }}>
          <Avatar src={user?.profile.avatar} />
        </IconButton>
      ) : (
        <Avatar sx={{ mx: 2, width: 40, height: 40 }}>
          <span style={{ padding: '5px' }}>
            {getFirstChars(user?.profile?.full_name || user?.email)}
          </span>
        </Avatar>
      )}
    </Tooltip>
  )
}
