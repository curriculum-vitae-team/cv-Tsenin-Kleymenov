import { AppNavigationRoutes } from '@/router/paths'

export interface ITab {
  label: string
  path: string
}

export const PROFILE_TABS: ITab[] = [
  {
    label: 'Profile',
    path: AppNavigationRoutes.PROFILE
  },
  {
    label: 'Skills',
    path: AppNavigationRoutes.SKILLS
  },

  {
    label: 'Languages',
    path: AppNavigationRoutes.LANGUAGES
  },
  {
    label: 'CVs',
    path: AppNavigationRoutes.CVS
  }
]

export const CV_TABS: ITab[] = [
  {
    label: 'Details',
    path: AppNavigationRoutes.DETAILS
  },
  {
    label: 'Projects',
    path: AppNavigationRoutes.PROJECTS
  },

  {
    label: 'Preview',
    path: AppNavigationRoutes.PREVIEW
  }
]

export const HEADER_TABS: ITab[] = [
  {
    label: 'Login',
    path: AppNavigationRoutes.LOGIN
  },
  {
    label: 'SignUp',
    path: AppNavigationRoutes.SIGN_UP
  }
]
