import { FC } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'

import Layout from '@/components/wrappers/layout/Layout'
import { CVDetailsPage } from '@/pages/CVDetailsPage/CVDetailsPage'
import { CVPage } from '@/pages/CVPage'
import { CVPreviewPage } from '@/pages/CVPreviewPage'
import { CVProjectsPage } from '@/pages/CVProjectsPage/CVProjectsPage'
import { CVsPage } from '@/pages/CVsPage/CVsPage'
import { DepartmentsPage } from '@/pages/DepartmentsPage/DepartmentsPage'
import { EmployeesPage } from '@/pages/EmployeesPage/EmployeesPage'
import { LanguagesPage } from '@/pages/LanguagesPage/LanguagesPage'
import { AppLayout } from '@/pages/Layouts/AppLayoutAuth'
import { PositionsPage } from '@/pages/PositionsPage/PositionsPage'
import { ProfileCVsPage } from '@/pages/ProfileCVsPage'
import { ProfileEmployeePage } from '@/pages/ProfileEmployeePage'
import { ProfileLanguagePage } from '@/pages/ProfileLanguagePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ProfileSkillsPage } from '@/pages/ProfileSkillsPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage/ProjectDetailPage'
import { ProjectsPage } from '@/pages/ProjectsPage/ProjectsPage'
import { SkillsPage } from '@/pages/SkillsPage/SkillsPage'

import { AppNavigationRoutes } from './paths'

const AuthenticatedApp: FC = () => {
  return (
    <Layout>
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

          <Route path={AppNavigationRoutes.PROJECTS} element={<Outlet />}>
            <Route index element={<ProjectsPage />} />

            <Route path=":id" element={<ProjectDetailPage />}>
              <Route index element={<ProjectDetailPage />} />
            </Route>
          </Route>

          <Route path={AppNavigationRoutes.CVS} element={<Outlet />}>
            <Route index element={<CVsPage />} />

            <Route path=":id" element={<CVPage />}>
              <Route index element={<CVPage />} />
              <Route path={AppNavigationRoutes.DETAILS} element={<CVDetailsPage />} />
              <Route path={AppNavigationRoutes.PROJECTS} element={<CVProjectsPage />} />
              <Route path={AppNavigationRoutes.PREVIEW} element={<CVPreviewPage />} />
            </Route>
          </Route>

          <Route path={AppNavigationRoutes.PROJECTS} element={<ProjectsPage />} />
          <Route path={AppNavigationRoutes.CVS} element={<CVsPage />} />
          <Route path={AppNavigationRoutes.POSITIONS} element={<PositionsPage />} />
          <Route path={AppNavigationRoutes.DEPARTMENTS} element={<DepartmentsPage />} />
          <Route path={AppNavigationRoutes.LANGUAGES} element={<LanguagesPage />} />
          <Route path={AppNavigationRoutes.SKILLS} element={<SkillsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${AppNavigationRoutes.EMPLOYEES}`} replace />} />
      </Routes>
    </Layout>
  )
}

export default AuthenticatedApp
