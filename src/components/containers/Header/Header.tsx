import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'
import { Tab } from '@mui/material'

import { AppTabs } from '@/components/views/AppTabs/AppTabs'
import { SideMenu } from '@/components/views/SideMenu/SideMenu'
import { UserMenu } from '@/components/views/UserMenu/UserMenu'
import { authService } from '@/graphql/auth/authService'
import { AppNavigationRoutes } from '@/router/paths'

import { HeaderAuthWrapper, HeaderTabsWrapper, HeaderWrapper } from './Header.styles'

export const Header: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)
  const location = useLocation()

  return (
    <HeaderWrapper color="secondary">
      {isAuth ? (
        <HeaderAuthWrapper>
          <SideMenu />
          <UserMenu />
        </HeaderAuthWrapper>
      ) : (
        <HeaderTabsWrapper>
          <AppTabs textColor="primary" value={location.pathname}>
            <Tab
              label="Login"
              value={AppNavigationRoutes.LOGIN}
              component={NavLink}
              to={AppNavigationRoutes.LOGIN}
            />
            <Tab
              label="SignUp"
              value={AppNavigationRoutes.SIGNUP}
              component={NavLink}
              to={AppNavigationRoutes.SIGNUP}
            />
          </AppTabs>
        </HeaderTabsWrapper>
      )}
    </HeaderWrapper>
  )
}
