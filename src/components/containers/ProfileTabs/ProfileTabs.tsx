import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'

import AppTabs from '@/components/views/AppTabs/AppTabs'
import { AppNavigationRoutes } from '@/router/paths'

const ProfileTabs: FC = () => {
  const location = useLocation()

  return (
    <AppTabs textColor="inherit" value={location.pathname}>
      <Tab
        label="Profile"
        value={AppNavigationRoutes.Profile}
        component={Link}
        to={AppNavigationRoutes.Profile}
      />
      <Tab
        label="Skills"
        value={AppNavigationRoutes.Skills}
        component={Link}
        to={AppNavigationRoutes.Languages}
      />
      <Tab
        label="Languages"
        value={AppNavigationRoutes.Languages}
        component={Link}
        to={AppNavigationRoutes.Languages}
      />
      <Tab
        label="CVs"
        value={AppNavigationRoutes.Cvs}
        component={Link}
        to={AppNavigationRoutes.Cvs}
      />
    </AppTabs>
  )
}

export default ProfileTabs
