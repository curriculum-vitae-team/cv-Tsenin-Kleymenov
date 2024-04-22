import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { AppLayoutUnAuth } from '@/pages/Layouts/AppLayoutUnAuth'
import { LoginPage } from '@/pages/LoginPage'
import { SignUpPage } from '@/pages/SignUpPage'

import { AppNavigationRoutes } from './paths'

const UnauthenticatedApp: FC = () => {
  return (
    <Routes>
      <Route path={AppNavigationRoutes.INDEX} element={<AppLayoutUnAuth />}>
        <Route index element={<Navigate to={`/${AppNavigationRoutes.LOGIN}`} replace />} />
        <Route path={AppNavigationRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppNavigationRoutes.SIGN_UP} element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${AppNavigationRoutes.LOGIN}`} replace />} />
    </Routes>
  )
}

export default UnauthenticatedApp
