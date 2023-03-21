import { FC } from 'react'
import { Avatar, IconButton, Tooltip } from '@mui/material'

import { IUserAvatarProps } from './UserAvatar.interfaces'

export const UserAvatar: FC<IUserAvatarProps> = ({ handleClick }) => {
  return (
    <Tooltip title="User account ">
      <IconButton onClick={handleClick} sx={{ ml: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
    </Tooltip>
  )
}
