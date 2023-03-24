import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import { authService } from '@/graphql/auth/authService'

const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))

export const AppRouter: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)

  return (
    <Routes>
      {isAuth ? (
        <Route path="*" element={<AuthenticatedApp />} />
      ) : (
        <Route path="*" element={<UnauthenticatedApp />} />
      )}
    </Routes>
  )
}
