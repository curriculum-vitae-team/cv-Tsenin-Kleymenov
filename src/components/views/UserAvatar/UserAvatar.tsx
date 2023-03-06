import { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { IUserAvatarProps } from './UserAvatar.interfaces'

export const UserAvatar: FC<IUserAvatarProps> = ({ handleClick }) => {
  return (
    <Box>
      <Tooltip title="User account ">
        <IconButton onClick={handleClick} sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Tooltip>
    </Box>
  )
}
