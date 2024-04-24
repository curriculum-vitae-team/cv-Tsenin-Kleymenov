import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ListItemText, MenuItem } from '@mui/material'

import { IUserMenuItemProps } from './UserMenuItem.interfaces'
import { ListItemIcon } from './UserMenuItem.styles'

export const UserMenuItem: FC<IUserMenuItemProps> = ({ onClick, Icon, text }) => {
  const { t } = useTranslation()

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText>{t(text)}</ListItemText>
    </MenuItem>
  )
}
