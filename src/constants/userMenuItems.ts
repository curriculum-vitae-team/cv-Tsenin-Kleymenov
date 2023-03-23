import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Settings from '@mui/icons-material/Settings'

import { AppNavigationRoutes } from '@/router/paths'

export const USER_MENU_ITEMS = {
  profile: {
    text: 'Profile',
    route: AppNavigationRoutes.PROFILE,
    icon: AccountCircleIcon
  },
  settings: {
    text: 'Settings',
    route: AppNavigationRoutes.SETTINGS,
    icon: Settings
  }
}
