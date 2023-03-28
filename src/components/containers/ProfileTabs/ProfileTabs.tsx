import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Tab } from '@mui/material'

import { IDepartmentResult, IPositionResult, IUserResult } from '@/appTypes/IResult.interfaces'
import { EmployeeProfileForm } from '@/components/containers/EmployeeProfileForm/EmployeeProfileForm'
import { AppTabs } from '@/components/views/AppTabs/AppTabs'
import { Loader } from '@/components/views/Loader/Loader'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { USER } from '@/graphql/user/userQuery'
import { AppNavigationRoutes } from '@/router/paths'
import { getUserProfilePath } from '@/utils/getUserProfilePath'

import { IProfileTabsProps } from './ProfileTabs.interfaces'

export const ProfileTabs: FC<IProfileTabsProps> = ({ userId }) => {
  const location = useLocation()

  const { loading: loadingUser, data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const { loading: departmentsLoading, data: departmentsData } =
    useQuery<IDepartmentResult>(DEPARTMENTS)

  const { loading: positionsLoading, data: positionsData } = useQuery<IPositionResult>(POSITIONS)

  if (loadingUser || departmentsLoading || positionsLoading) {
    return <Loader color="primary" />
  }

  return (
    <>
      <AppTabs textColor="inherit" value={location.pathname}>
        <Tab
          label="Profile"
          value={getUserProfilePath(AppNavigationRoutes.PROFILE, userData?.user)}
          component={Link}
          to={getUserProfilePath(AppNavigationRoutes.PROFILE, userData?.user)}
        />
        <Tab
          label="Skills"
          value={getUserProfilePath(AppNavigationRoutes.SKILLS_PROFILE, userData?.user)}
          component={Link}
          to={getUserProfilePath(AppNavigationRoutes.SKILLS_PROFILE, userData?.user)}
        />
        <Tab
          label="Languages"
          value={getUserProfilePath(AppNavigationRoutes.LANGUAGES_PROFILE, userData?.user)}
          component={Link}
          to={getUserProfilePath(AppNavigationRoutes.LANGUAGES_PROFILE, userData?.user)}
        />
        <Tab
          label="CVs"
          value={getUserProfilePath(AppNavigationRoutes.CVS_PROFILE, userData?.user)}
          component={Link}
          to={getUserProfilePath(AppNavigationRoutes.CVS_PROFILE, userData?.user)}
        />
      </AppTabs>

      {getUserProfilePath(AppNavigationRoutes.PROFILE, userData?.user) === location.pathname && (
        <EmployeeProfileForm
          currentUser={userData?.user}
          positions={positionsData?.positions}
          departments={departmentsData?.departments}
        />
      )}
      {getUserProfilePath(AppNavigationRoutes.SKILLS_PROFILE, userData?.user) ===
        location.pathname && <>SKILLS_PROFILE</>}
      {getUserProfilePath(AppNavigationRoutes.LANGUAGES_PROFILE, userData?.user) ===
        location.pathname && <>LANGUAGES_PROFILE</>}
      {getUserProfilePath(AppNavigationRoutes.CVS_PROFILE, userData?.user) ===
        location.pathname && <>CVS_PROFILE</>}
    </>
  )
}
