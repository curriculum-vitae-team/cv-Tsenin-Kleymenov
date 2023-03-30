import { AppNavigationRoutes } from '@/router/paths'

export interface ITab {
  label: string
  path: string
}

export const profileTabs: ITab[] = [
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

export const headerTabs: ITab[] = [
  {
    label: 'Login',
    path: AppNavigationRoutes.LOGIN
  },
  {
    label: 'SignUp',
    path: AppNavigationRoutes.SIGN_UP
  }
]
