import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { ISideMenuItemProps } from './SideMenuItem.interfaces'

export const SideMenuItem: FC<ISideMenuItemProps> = ({ Icon, route, text, isActive }) => {
  const { t } = useTranslation()

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton component={Link} to={route}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText sx={{ color: isActive ? '#c63031' : '' }}>{t(text)}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
