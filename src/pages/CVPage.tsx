import { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { NavigationTabs } from '@/components/views/NavigationTabs/NavigationTabs'
import { CV_TABS } from '@/constants/tabs'
import { AppNavigationRoutes } from '@/router/paths'

export const CVPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const pathCheck =
      CV_TABS.map(item => item.path).filter(path => location.pathname.includes(path)).length > 0
    if (!pathCheck) {
      navigate(`/${AppNavigationRoutes.CVS}`)
    }
  }, [location])

  return (
    <>
      <NavigationTabs
        textColor="inherit"
        tabs={CV_TABS}
        locationState={AppNavigationRoutes.CVS}
        defaultValue={AppNavigationRoutes.DETAILS}
      />
      <Outlet />
    </>
  )
}
