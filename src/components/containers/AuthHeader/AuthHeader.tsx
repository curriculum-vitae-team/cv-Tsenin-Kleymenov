import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Tab } from '@mui/material'

import { AppNavigationRoutes } from '../../../constants/paths'
import AppTabs from '../AppTabs/AppTabs'

import { HeaderTabsWrapper } from './AuthHeader.styles'

const AuthHeader: FC = () => {
  const [tab, setTab] = useState<string>('login')

  return (
    <HeaderTabsWrapper>
      <AppTabs textColor="primary" tab={tab} setTab={setTab}>
        <Tab label="Login" value="login" component={NavLink} to={AppNavigationRoutes.SignIn} />
        <Tab label="SignUp" value="signUp" component={NavLink} to={AppNavigationRoutes.SignUp} />
      </AppTabs>
    </HeaderTabsWrapper>
  )
}

export default AuthHeader
