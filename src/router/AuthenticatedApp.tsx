import { FC, lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'

import SettingsPage from '@/pages/SettingsPage/SettingsPage'

import { AppNavigationRoutes } from './paths'

const EmployeesPage = lazy(() => import('@/pages/EmployeesPage/EmployeesPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const ProfileEmployeePage = lazy(() => import('@/pages/ProfileEmployeePage'))
const ProfileSkillsPage = lazy(() => import('@/pages/ProfileSkillsPage'))
const ProfileLanguagePage = lazy(() => import('@/pages/ProfileLanguagePage'))
const ProfileCVsPage = lazy(() => import('@/pages/ProfileCVsPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage/ProjectDetailPage'))
const CVsPage = lazy(() => import('@/pages/CVsPage/CVsPage'))
const CVPage = lazy(() => import('@/pages/CVPage'))
const CVDetailsPage = lazy(() => import('@/pages/CVDetailsPage/CVDetailsPage'))
const CVPreviewPage = lazy(() => import('@/pages/CVPreviewPage/CVPreviewPage'))
const PositionsPage = lazy(() => import('@/pages/PositionsPage/PositionsPage'))
const DepartmentsPage = lazy(() => import('@/pages/DepartmentsPage/DepartmentsPage'))
const LanguagesPage = lazy(() => import('@/pages/LanguagesPage/LanguagesPage'))
const SkillsPage = lazy(() => import('@/pages/SkillsPage/SkillsPage'))
const Layout = lazy(() => import('@/components/wrappers/layout/Layout'))
const AppLayout = lazy(() => import('@/pages/Layouts/AppLayoutAuth'))

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
              <Route path={AppNavigationRoutes.PREVIEW} element={<CVPreviewPage />} />
            </Route>
          </Route>

          <Route path={AppNavigationRoutes.POSITIONS} element={<PositionsPage />} />
          <Route path={AppNavigationRoutes.DEPARTMENTS} element={<DepartmentsPage />} />
          <Route path={AppNavigationRoutes.LANGUAGES} element={<LanguagesPage />} />
          <Route path={AppNavigationRoutes.SKILLS} element={<SkillsPage />} />
          <Route path={AppNavigationRoutes.SETTINGS} element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${AppNavigationRoutes.EMPLOYEES}`} replace />} />
      </Routes>
    </Layout>
  )
}

export default AuthenticatedApp
