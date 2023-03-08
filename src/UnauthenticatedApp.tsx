import React, { FC } from 'react'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'

import AuthHeader from './components/containers/AuthHeader/AuthHeader'
import HeaderWrapper from './components/views/HeaderWrapper/HeaderWrapper'
import { AppNavigationRoutes } from './constants/paths'

const SignInPage = React.lazy(async () => await import('./pages/SignInPage'))
const SignUpPage = React.lazy(async () => await import('./pages/SignUpPage'))

const UnauthenticatedApp: FC = () => {
  return (
    <>
      <HeaderWrapper>
        <AuthHeader />
      </HeaderWrapper>
      <Routes>
        <Route path={AppNavigationRoutes.SignIn} element={<SignInPage />} />
        <Route path={AppNavigationRoutes.SignUp} element={<SignUpPage />} />
        <Route path="*" element={<Navigate to={AppNavigationRoutes.SignIn} replace />} />
      </Routes>
    </>
  )
}

export default UnauthenticatedApp
