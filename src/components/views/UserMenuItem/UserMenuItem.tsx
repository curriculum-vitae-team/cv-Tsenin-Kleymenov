import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { AppNavigationRoutes } from '@/router/paths'

import { IUserMenuItemProps } from './UserMenuItem.interfaces'

export const UserMenuItem: FC<IUserMenuItemProps> = ({ userId, onClick, route, Icon, text }) => {
  return (
    <MenuItem
      onClick={onClick}
      component={Link}
      to={`/${AppNavigationRoutes.EMPLOYEES}/${userId}/${route}`}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
