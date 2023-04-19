import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Logout } from '@mui/icons-material'
import { Divider, Menu, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { UserMenuItem } from '@/components/views/UserMenuItem/UserMenuItem'
import { USER_MENU_ITEMS } from '@/constants/userMenuItems'
import { authService } from '@/graphql/auth/authService'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { USER } from '@/graphql/user/userQuery'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { MenuContainer, PaperPropsUserMenu, UserMenuInfo } from './UserMenu.styles'

export const UserMenu: FC = () => {
  const { user } = useUser()

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { data } = useQuery<IUserResult>(USER, {
    variables: { id: user?.id },
    fetchPolicy: FETCH_POLICY.cacheOnly
  })

  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = async (): Promise<void> => {
    await authService.clearStorage()
    navigate(`/${AppNavigationRoutes.LOGIN}`)
  }

  return (
    <MenuContainer>
      <UserMenuInfo onClick={handleOpen}>
        <Typography variant="h5">{data?.user.profile.full_name || data?.user.email}</Typography>
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
          return <UserMenuItem key={text} route={route} text={text} Icon={Icon} />
        })}
        <Divider />
        <UserMenuItem onClick={handleLogout} text="Logout" Icon={Logout} />
      </Menu>
    </MenuContainer>
  )
}
