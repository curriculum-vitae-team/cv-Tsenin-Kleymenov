import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { ISideMenuItemProps } from './SideMenuItem.interfaces'

export const SideMenuItem: FC<ISideMenuItemProps> = ({ onClick, Icon, route, text }) => {
  return (
    <ListItem onClick={onClick} key={text} disablePadding>
      <ListItemButton component={Link} to={route}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
