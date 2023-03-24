import React, { FC, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Logout } from '@mui/icons-material'
import { Divider, Menu, Typography } from '@mui/material'

import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { UserMenuItem } from '@/components/views/UserMenuItem/UserMenuItem'
import { USER_MENU_ITEMS } from '@/constants/userMenuItems'
import { authService } from '@/graphql/auth/authService'
import { AppNavigationRoutes } from '@/router/paths'

import { MenuContainer, PaperPropsUserMenu, UserMenuInfo } from './UserMenu.styles'

export const UserMenu: FC = () => {
  const user = useReactiveVar(authService.user$)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = (): void => {
    authService.clearStorage()
  }

  return (
    <MenuContainer>
      <UserMenuInfo onClick={handleOpen}>
        <Typography variant="h6">{user?.email}</Typography>
        <UserAvatar userEmail={user?.email} />
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
        <UserMenuItem
          onClick={handleLogout}
          route={AppNavigationRoutes.LOGIN}
          text="Logout"
          Icon={Logout}
        />
      </Menu>
    </MenuContainer>
  )
}
