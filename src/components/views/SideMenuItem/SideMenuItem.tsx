import { FC } from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { ISideMenuItem } from './SideMenuItem.interfaces'

export const SideMenuItem: FC<ISideMenuItem> = ({ onClick, Icon, route ,text}) => {
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
