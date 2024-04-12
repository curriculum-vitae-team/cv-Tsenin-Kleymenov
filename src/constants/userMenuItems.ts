import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Settings from '@mui/icons-material/Settings'

import { IMenuItems } from '@/components/views/SideMenu/SideMenu.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

export const USER_MENU_ITEMS: IMenuItems = {
  profile: {
    text: 'profile',
    route: AppNavigationRoutes.PROFILE,
    icon: AccountCircleIcon
  },
  settings: {
    text: 'settings',
    route: AppNavigationRoutes.SETTINGS,
    icon: Settings
  }
}
