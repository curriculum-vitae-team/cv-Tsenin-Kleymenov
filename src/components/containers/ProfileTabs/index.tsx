import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tab } from '@mui/material'

import { AppNavigationRoutes } from '../../../constants/paths'
import AppTabs from '../AppTabs'

const ProfileTabs: FC = () => {
  const [tab, setTab] = useState<string>('profile')

  return (
    <AppTabs tab={tab} setTab={setTab} textColor="inherit">
      <Tab label="Profile" value="profile" component={Link} to={AppNavigationRoutes.Profile} />
      <Tab label="Skills" value="skills" component={Link} to={AppNavigationRoutes.Languages} />
      <Tab label="Languages" value="languages" component={Link} to={AppNavigationRoutes.Skills} />
      <Tab label="CVs" value="cvs" component={Link} to={AppNavigationRoutes.Cvs} />
    </AppTabs>
  )
}

export default ProfileTabs
