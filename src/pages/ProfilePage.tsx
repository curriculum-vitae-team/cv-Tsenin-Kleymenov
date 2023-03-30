import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { NavigationTabs } from '@/components/views/NavigationTabs/NavigationTabs'
import { profileTabs } from '@/constants/tabs'
import { AppNavigationRoutes } from '@/router/paths'

export const ProfilePage: FC = () => {
  return (
    <>
      <NavigationTabs
        textColor="inherit"
        tabs={profileTabs}
        defaultValue={AppNavigationRoutes.PROFILE}
      />
      <Outlet />
    </>
  )
}
