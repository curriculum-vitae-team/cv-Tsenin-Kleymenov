import React, { FC, useState } from 'react'
import { USER_MENU_ITEMS } from '@constants/userMenuItems'
import { Logout } from '@mui/icons-material'
import { Divider, Menu, Typography } from '@mui/material'

import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserMenuItem } from '../UserMenuItem/UserMenuItem'

import { MenuContainer, PaperPropsUserMenu, UserMenuInfo } from './UserMenu.styles'

export const UserMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <MenuContainer>
      <UserMenuInfo onClick={handleOpen}>
        <Typography variant="h6">USER_EMAIL</Typography>
        <UserAvatar />
      </UserMenuInfo>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: PaperPropsUserMenu
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.values(USER_MENU_ITEMS).map(({ route, text, icon: Icon }) => {
          return <UserMenuItem key={text} route={route} text={text} Icon={Icon} />
        })}
        <Divider />
        <UserMenuItem route={USER_MENU_ITEMS.settings.route} text="Logout" Icon={Logout} />
      </Menu>
    </MenuContainer>
  )
}
