import { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Card } from '@mui/material'

import { NavigationTabs } from '@/components/views/NavigationTabs/NavigationTabs'
import { PROFILE_TABS } from '@/constants/tabs'
import { AppNavigationRoutes } from '@/router/paths'

export const ProfilePage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const pathCheck =
      PROFILE_TABS.map(item => item.path).filter(path => location.pathname.includes(path)).length >
      0
    if (!pathCheck) {
      navigate(`/${AppNavigationRoutes.EMPLOYEES}`)
    }
  }, [location])

  return (
    <>
      <NavigationTabs
        textColor="inherit"
        tabs={PROFILE_TABS}
        locationState={AppNavigationRoutes.EMPLOYEES}
        defaultValue={AppNavigationRoutes.PROFILE}
      />
      <Card sx={{ p: 2, height: 'auto', overflow: 'auto' }}>
        <Outlet />
      </Card>
    </>
  )
}
