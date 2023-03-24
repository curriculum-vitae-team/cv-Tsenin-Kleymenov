import React from 'react'
import { Navigate } from 'react-router'

import { IRoute } from '@/router/paths.interfaces'

const LoginPage = React.lazy(async () => await import('@/pages/LoginPage/LoginPage'))
const SignUpPage = React.lazy(async () => await import('@/pages/SignUpPage/SignUpPage'))
const EmployeesPage = React.lazy(async () => await import('@/pages/EmployeesPage/EmployeesPage'))

export const AppNavigationRoutes = {
  INDEX: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  EMPLOYEES: '/employees',
  PROJECTS: '/projects',
  DEPARTMENTS: '/departments',
  POSITIONS: '/positions',
  PROFILE: '/profile',
  SKILLS: '/skills',
  LANGUAGES: '/languages',
  SETTINGS: '/settings',
  CVS: '/cvs',
  PAGE_NOT_FOUND: '*'
}

export const PUBLIC_ROUTES: IRoute[] = [
  { path: AppNavigationRoutes.LOGIN, element: <LoginPage /> },
  { path: AppNavigationRoutes.SIGN_UP, element: <SignUpPage /> },
  {
    path: AppNavigationRoutes.PAGE_NOT_FOUND,
    element: <Navigate to={AppNavigationRoutes.LOGIN} replace />
  }
]

export const PRIVATE_ROUTES: IRoute[] = [
  { path: AppNavigationRoutes.EMPLOYEES, element: <EmployeesPage /> },
  {
    path: AppNavigationRoutes.PAGE_NOT_FOUND,
    element: <Navigate to={AppNavigationRoutes.EMPLOYEES} replace />
  }
]
