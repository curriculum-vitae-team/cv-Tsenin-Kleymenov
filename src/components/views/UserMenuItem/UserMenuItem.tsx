import { FC } from 'react'
import { Link } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'

import { IUserMenuItem } from './UserMenuItem.interfaces'

export const UserMenuItem: FC<IUserMenuItem> = ({ onClick, Icon, text }) => {
  return (
    <MenuItem component={Link} to={`/${text}`} onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}
