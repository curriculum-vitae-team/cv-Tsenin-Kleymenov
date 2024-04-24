import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Logout } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Settings from '@mui/icons-material/Settings'
import { Divider, Menu, Typography } from '@mui/material'

import { IProfileResult } from '@/appTypes/IResult.interfaces'
import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { UserMenuItem } from '@/components/views/UserMenuItem/UserMenuItem'
import { authService } from '@/graphql/auth/authService'
import { PROFILE } from '@/graphql/profile/profileQuery'
import { useMenu } from '@/hooks/useMenu'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { IMenuItems } from '../SideMenu/SideMenu.interfaces'

import { MenuContainer, PaperPropsUserMenu, UserMenuInfo } from './UserMenu.styles'

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

  const baseProfileRoute = `${AppNavigationRoutes.EMPLOYEES}/${user?.id}`

  const USER_MENU_ITEMS: IMenuItems = {
    profile: {
      text: 'profile',
      onClick: () => {
        navigate(`/${baseProfileRoute}/${AppNavigationRoutes.PROFILE}`)
      },
      icon: AccountCircleIcon
    },
    settings: {
      text: 'settings',
      onClick: () => {
        navigate(`/${AppNavigationRoutes.SETTINGS}`)
      },
      icon: Settings
    }
  }

  return (
    <MenuContainer>
      <UserMenuInfo onClick={handleClick}>
        <Typography variant="h5">{data?.user.profile.full_name || data?.user.email}</Typography>
        <UserAvatar profile={data?.user.profile} />
      </UserMenuInfo>
      {!!anchorEl && (
        <Menu
          open
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: PaperPropsUserMenu
            }
          }}
        >
          {Object.values(USER_MENU_ITEMS).map(({ onClick, text, icon: Icon }) => {
            return <UserMenuItem key={text} onClick={onClick} text={text} Icon={Icon} />
          })}
          <Divider />
          <UserMenuItem onClick={handleLogout} text="logout" Icon={Logout} />
        </Menu>
      )}
    </MenuContainer>
  )
}
