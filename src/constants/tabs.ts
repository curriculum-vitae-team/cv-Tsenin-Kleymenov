import { AppNavigationRoutes } from '@/router/paths'

export interface ITab {
  label: string
  path: string
}

export const PROFILE_TABS: ITab[] = [
  {
    label: 'profile',
    path: AppNavigationRoutes.PROFILE
  },
  {
    label: 'skills',
    path: AppNavigationRoutes.SKILLS
  },

  {
    label: 'languages',
    path: AppNavigationRoutes.LANGUAGES
  },
  {
    label: 'cvs',
    path: AppNavigationRoutes.CVS
  }
]

export const CV_TABS: ITab[] = [
  {
    label: 'details',
    path: AppNavigationRoutes.DETAILS
  },
  {
    label: 'preview',
    path: AppNavigationRoutes.PREVIEW
  }
]

export const HEADER_TABS: ITab[] = [
  {
    label: 'login',
    path: AppNavigationRoutes.LOGIN
  },
  {
    label: 'signUpForm',
    path: AppNavigationRoutes.SIGN_UP
  }
]
