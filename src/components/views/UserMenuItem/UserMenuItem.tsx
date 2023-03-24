import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { IUserMenuItem } from './UserMenuItem.interfaces'

export const UserMenuItem: FC<IUserMenuItem> = ({ onClick, route, Icon, text }) => {
  return (
    <MenuItem onClick={onClick} component={Link} to={route}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
