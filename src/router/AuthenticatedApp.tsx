import { FC } from 'react'
import { Route, Routes } from 'react-router'

import { HeaderAuthenticated } from '@/components/containers/HeaderAuthenticated/HeaderAuthenticated'
import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { PRIVATE_ROUTES } from '@/router/paths'

const AuthenticatedApp: FC = () => {
  return (
    <>
      <HeaderAuthenticated />
      <AppBreadcrumbs />
      <Routes>
        {PRIVATE_ROUTES.map(route => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </>
  )
}

export default AuthenticatedApp
