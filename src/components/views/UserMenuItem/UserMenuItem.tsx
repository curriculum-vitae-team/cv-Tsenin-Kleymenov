import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { IUserMenuItem } from './UserMenuItem.interfaces'

export const UserMenuItem: FC<IUserMenuItem> = ({ route, Icon, text }) => {
  return (
    <MenuItem component={Link} to={route}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
