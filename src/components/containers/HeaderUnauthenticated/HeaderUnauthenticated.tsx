import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'

import { AppTabs } from '@/components/views/AppTabs/AppTabs'
import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { AppNavigationRoutes } from '@/router/paths'

import { HeaderTabsWrapper } from './HeaderUnauthenticated.styles'

export const HeaderUnauthenticated: FC = () => {
  const location = useLocation()

  return (
    <HeaderWrapper color="secondary">
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
            value={AppNavigationRoutes.SIGN_UP}
            component={NavLink}
            to={AppNavigationRoutes.SIGN_UP}
          />
        </AppTabs>
      </HeaderTabsWrapper>
    </HeaderWrapper>
  )
}
