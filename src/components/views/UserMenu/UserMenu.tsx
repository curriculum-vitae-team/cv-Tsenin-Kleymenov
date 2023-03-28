import React, { FC, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Logout } from '@mui/icons-material'
import { Divider, Menu, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { UserMenuItem } from '@/components/views/UserMenuItem/UserMenuItem'
import { USER_MENU_ITEMS } from '@/constants/userMenuItems'
import { authService } from '@/graphql/auth/authService'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { AppNavigationRoutes } from '@/router/paths'

import { MenuContainer, PaperPropsUserMenu, UserMenuInfo } from './UserMenu.styles'

export const UserMenu: FC = () => {
  const user = useReactiveVar<IUser | null>(authService.user$)

  const { data } = useQuery<IUserResult>(USER, {
    variables: { id: user?.id }
  })

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
        <Typography variant="h6">{data?.user.profile.full_name || data?.user.email}</Typography>
        <UserAvatar user={data?.user} />
      </UserMenuInfo>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: PaperPropsUserMenu
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.values(USER_MENU_ITEMS).map(({ route, text, icon: Icon }) => {
          return <UserMenuItem user={user} key={text} route={route} text={text} Icon={Icon} />
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
