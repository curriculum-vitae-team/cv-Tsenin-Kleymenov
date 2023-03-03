import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Tab } from '@mui/material'

import { AppNavigationRoutes } from '../../../constants/paths'

import { HeaderTabs } from './index.styles'

const AuthHeader: FC = () => {
  const [value, setValue] = useState<string>('login')

  const handleChange = (_: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }

  return (
    <HeaderTabs
      value={value}
      onChange={handleChange}
      aria-label="Navigation"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab label="Login" value="login" component={NavLink} to={AppNavigationRoutes.SignIn} />
      <Tab label="SignUp" value="signUp" component={NavLink} to={AppNavigationRoutes.SignUp} />
    </HeaderTabs>
  )
}

export default AuthHeader
