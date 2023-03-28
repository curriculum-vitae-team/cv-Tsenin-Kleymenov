import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { getUserProfilePath } from '@/utils/getUserProfilePath'

import { IUserMenuItemProps } from './UserMenuItem.interfaces'

export const UserMenuItem: FC<IUserMenuItemProps> = ({ user, onClick, route, Icon, text }) => {
  return (
    <MenuItem onClick={onClick} component={Link} to={getUserProfilePath(route, user)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
