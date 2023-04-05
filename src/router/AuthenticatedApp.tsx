import { FC } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'

import { EmployeesPage } from '@/pages/EmployeesPage/EmployeesPage'
import { AppLayout } from '@/pages/Layouts/AppLayoutAuth'
import { PositionsPage } from '@/pages/PositionsPage/PositionsPage'
import { ProfileCVsPage } from '@/pages/ProfileCVsPage'
import { ProfileEmployeePage } from '@/pages/ProfileEmployeePage'
import { ProfileLanguagePage } from '@/pages/ProfileLanguagePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ProfileSkillsPage } from '@/pages/ProfileSkillsPage'
import { ProjectsPage } from '@/pages/ProjectsPage/ProjectsPage'

import { AppNavigationRoutes } from './paths'

const AuthenticatedApp: FC = () => {
  return (
    <Routes>
      <Route path={AppNavigationRoutes.INDEX} element={<AppLayout />}>
        <Route index element={<Navigate to={`/${AppNavigationRoutes.EMPLOYEES}`} replace />} />

        <Route path={AppNavigationRoutes.EMPLOYEES} element={<Outlet />}>
          <Route index element={<EmployeesPage />} />

          <Route path=":id" element={<ProfilePage />}>
            <Route index element={<ProfilePage />} />
            <Route path={AppNavigationRoutes.PROFILE} element={<ProfileEmployeePage />} />
            <Route path={AppNavigationRoutes.SKILLS} element={<ProfileSkillsPage />} />
            <Route path={AppNavigationRoutes.LANGUAGES} element={<ProfileLanguagePage />} />
            <Route path={AppNavigationRoutes.CVS} element={<ProfileCVsPage />} />
          </Route>
        </Route>

        <Route path={AppNavigationRoutes.PROJECTS} element={<ProjectsPage />} />
        <Route path={AppNavigationRoutes.POSITIONS} element={<PositionsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${AppNavigationRoutes.EMPLOYEES}`} replace />} />
    </Routes>
  )
}

export default AuthenticatedApp
