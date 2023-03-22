import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'

import AppTabs from '@/components/views/AppTabs/AppTabs'
import { AppNavigationRoutes } from '@/constants/paths'

import { HeaderTabsWrapper } from './AuthHeader.styles'

const AuthHeader: FC = () => {
  const location = useLocation()

  return (
    <HeaderTabsWrapper>
      <AppTabs textColor="primary" value={location.pathname}>
        <Tab
          label="Login"
          value={AppNavigationRoutes.SignIn}
          component={NavLink}
          to={AppNavigationRoutes.SignIn}
        />
        <Tab
          label="SignUp"
          value={AppNavigationRoutes.SignUp}
          component={NavLink}
          to={AppNavigationRoutes.SignUp}
        />
      </AppTabs>
    </HeaderTabsWrapper>
  )
}

export default AuthHeader
