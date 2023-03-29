import { AppNavigationRoutes } from '@/router/paths'
import { getUserProfilePath } from '@/utils/getUserProfilePath'

interface ICreateTabsResult {
  label: string
  path: string
}

export const createTabs = (id: string | undefined): ICreateTabsResult[] => {
  const tabs = [
    {
      label: 'Profile',
      path: getUserProfilePath(AppNavigationRoutes.PROFILE, id)
    },
    {
      label: 'Skills',
      path: getUserProfilePath(AppNavigationRoutes.SKILLS_PROFILE, id)
    },

    {
      label: 'Languages',
      path: getUserProfilePath(AppNavigationRoutes.LANGUAGES_PROFILE, id)
    },
    {
      label: 'CVs',
      path: getUserProfilePath(AppNavigationRoutes.CVS_PROFILE, id)
    }
  ]

  return tabs
}
