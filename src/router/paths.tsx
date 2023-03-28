import React from 'react'
import { Navigate } from 'react-router'

import EmployeesPage from '@/pages/EmployeesPage/EmployeesPage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import { IPath, IRoute } from '@/router/paths.interfaces'

const LoginPage = React.lazy(async () => await import('@/pages/LoginPage/LoginPage'))
const SignUpPage = React.lazy(async () => await import('@/pages/SignUpPage/SignUpPage'))

export const AppNavigationRoutes: IPath = {
  INDEX: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  EMPLOYEES: '/employees',
  PROJECTS: '/projects',
  DEPARTMENTS: '/departments',
  POSITIONS: '/positions',
  SKILLS: '/skills',
  LANGUAGES: '/languages',
  SETTINGS: '/settings',
  CVS: '/cvs',
  PROFILE: '/employees/:id/profile',
  SKILLS_PROFILE: '/employees/:id/skills',
  LANGUAGES_PROFILE: '/employees/:id/languages',
  SETTINGS_PROFILE: '/employees/:id/settings',
  CVS_PROFILE: '/employees/:id/cvs',
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
  { path: AppNavigationRoutes.PROFILE, element: <ProfilePage /> },
  { path: AppNavigationRoutes.SKILLS_PROFILE, element: <ProfilePage /> },
  { path: AppNavigationRoutes.LANGUAGES_PROFILE, element: <ProfilePage /> },
  { path: AppNavigationRoutes.SETTINGS_PROFILE, element: <ProfilePage /> },
  { path: AppNavigationRoutes.CVS_PROFILE, element: <ProfilePage /> },

  {
    path: AppNavigationRoutes.PAGE_NOT_FOUND,
    element: <Navigate to={AppNavigationRoutes.EMPLOYEES} replace />
  }
]
