import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'

import { IUserMenuItemProps } from './UserMenuItem.interfaces'
import { ListItemIcon, ListItemText } from './UserMenuItem.styles'

export const UserMenuItem: FC<IUserMenuItemProps> = ({ onClick, Icon, text, iconColor }) => {
  const { t } = useTranslation()

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Icon color={iconColor && iconColor} />
      </ListItemIcon>
      <ListItemText>{t(text)}</ListItemText>
    </MenuItem>
  )
}
