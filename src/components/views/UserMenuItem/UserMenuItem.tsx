import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { authService } from '@/graphql/auth/authService'
import { AppNavigationRoutes } from '@/router/paths'

import { IUserMenuItemProps } from './UserMenuItem.interfaces'

export const UserMenuItem: FC<IUserMenuItemProps> = ({ onClick, route, Icon, text }) => {
  const user = useReactiveVar(authService.user$)

  return (
    <MenuItem
      onClick={onClick}
      component={Link}
      to={`/${AppNavigationRoutes.EMPLOYEES}/${user?.id}/${route}`}
      state={AppNavigationRoutes.EMPLOYEES}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
