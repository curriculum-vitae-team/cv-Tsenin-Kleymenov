import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Logout } from '@mui/icons-material'
import { Divider, Menu, Typography } from '@mui/material'

import { IProfileResult } from '@/appTypes/IResult.interfaces'
import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { UserMenuItem } from '@/components/views/UserMenuItem/UserMenuItem'
import { USER_MENU_ITEMS } from '@/constants/userMenuItems'
import { authService } from '@/graphql/auth/authService'
import { PROFILE } from '@/graphql/profile/profileQuery'
import { useMenu } from '@/hooks/useMenu'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { MenuContainer, UserMenuInfo } from './UserMenu.styles'

export const UserMenu: FC = () => {
  const { user } = useUser()

  const navigate = useNavigate()

  const { anchorEl, handleClick, handleClose } = useMenu()

  const { data } = useQuery<IProfileResult>(PROFILE, {
    variables: { id: user?.id }
  })

  const handleLogout = (): void => {
    authService.clearStorage()
    navigate(`/${AppNavigationRoutes.LOGIN}`)
  }

  return (
    <MenuContainer>
      <UserMenuInfo onClick={handleClick}>
        <Typography variant="h5">{data?.user.profile.full_name || data?.user.email}</Typography>
        <UserAvatar profile={data?.user.profile} />
      </UserMenuInfo>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.values(USER_MENU_ITEMS).map(({ route, text, icon: Icon }) => {
          return <UserMenuItem key={text} route={route} text={text} Icon={Icon} />
        })}
        <Divider />
        <UserMenuItem onClick={handleLogout} text="logout" Icon={Logout} />
      </Menu>
    </MenuContainer>
  )
}
