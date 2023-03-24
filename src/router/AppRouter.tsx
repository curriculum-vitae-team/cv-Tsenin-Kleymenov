import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import { authService } from '@/graphql/auth/authService'

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './paths'

export const AppRouter: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)
  const authRoutes = isAuth ? PRIVATE_ROUTES : PUBLIC_ROUTES

  return (
    <Routes>
      {authRoutes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  )
}
