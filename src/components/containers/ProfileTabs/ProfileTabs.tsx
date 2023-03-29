import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Tab } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { EmployeeProfileForm } from '@/components/containers/EmployeeProfileForm/EmployeeProfileForm'
import { AppTabs } from '@/components/views/AppTabs/AppTabs'
import { Loader } from '@/components/views/Loader/Loader'
import { USER } from '@/graphql/user/userQuery'
import { AppNavigationRoutes } from '@/router/paths'
import { getUserProfilePath } from '@/utils/getUserProfilePath'

import { createTabs } from './createTabs'
import { IProfileTabsProps } from './ProfileTabs.interfaces'

export const ProfileTabs: FC<IProfileTabsProps> = ({ userId }) => {
  const location = useLocation()

  const { loading: loadingUser, data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const tabs = createTabs(userId)

  if (loadingUser) {
    return <Loader color="primary" />
  }

  return (
    <>
      <AppTabs textColor="inherit" value={location.pathname}>
        {tabs.map(({ label, path }) => (
          <Tab key={label} label={label} value={path} component={Link} to={path} />
        ))}
      </AppTabs>

      {getUserProfilePath(AppNavigationRoutes.PROFILE, userId) === location.pathname && (
        <EmployeeProfileForm currentUser={userData?.user} />
      )}
      {getUserProfilePath(AppNavigationRoutes.SKILLS_PROFILE, userId) === location.pathname && (
        <>SKILLS_PROFILE</>
      )}
      {getUserProfilePath(AppNavigationRoutes.LANGUAGES_PROFILE, userId) === location.pathname && (
        <>LANGUAGES_PROFILE</>
      )}
      {getUserProfilePath(AppNavigationRoutes.CVS_PROFILE, userId) === location.pathname && (
        <>CVS_PROFILE</>
      )}
    </>
  )
}
