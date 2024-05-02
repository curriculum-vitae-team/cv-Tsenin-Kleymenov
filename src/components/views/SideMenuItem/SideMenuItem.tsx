import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ListItemButton } from '@mui/material'

import { ISideMenuItemProps } from './SideMenuItem.interfaces'
import { ListItem, ListItemIcon, ListItemText } from './SideMenuItem.styles'

export const SideMenuItem: FC<ISideMenuItemProps> = ({ Icon, route, text, isActive }) => {
  const { t } = useTranslation()

  return (
    <ListItem isActive={isActive} color="primary" key={text} disablePadding>
      <ListItemButton component={Link} to={route}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText isActive={isActive}>{t(text)}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
