import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'

import { AppTabs } from '@/components/views/AppTabs/AppTabs'
import { AppNavigationRoutes } from '@/router/paths'

const ProfileTabs: FC = () => {
  const location = useLocation()

  return (
    <AppTabs textColor="inherit" value={location.pathname}>
      <Tab
        label="Profile"
        value={AppNavigationRoutes.PROFILE}
        component={Link}
        to={AppNavigationRoutes.PROFILE}
      />
      <Tab
        label="Skills"
        value={AppNavigationRoutes.SKILLS}
        component={Link}
        to={AppNavigationRoutes.SKILLS}
      />
      <Tab
        label="Languages"
        value={AppNavigationRoutes.LANGUAGES}
        component={Link}
        to={AppNavigationRoutes.LANGUAGES}
      />
      <Tab
        label="CVs"
        value={AppNavigationRoutes.CVS}
        component={Link}
        to={AppNavigationRoutes.CVS}
      />
    </AppTabs>
  )
}

export default ProfileTabs
