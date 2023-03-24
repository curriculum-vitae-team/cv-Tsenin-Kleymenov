import { FC } from 'react'
import { IconButton, Tooltip } from '@mui/material'

import { IUserAvatarProps } from './UserAvatar.interfaces'
import { Avatar } from './UserAvatar.styles'

export const UserAvatar: FC<IUserAvatarProps> = ({ handleClick, userEmail }) => {
  const firstLetter = userEmail?.charAt(0).toUpperCase()

  return (
    <Tooltip title="User account ">
      <IconButton onClick={handleClick} sx={{ ml: 2 }}>
        <Avatar>{firstLetter}</Avatar>
      </IconButton>
    </Tooltip>
  )
}
