import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import Groups3Icon from '@mui/icons-material/Groups3'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import TranslateIcon from '@mui/icons-material/Translate'

import { IMenuItems } from '@/components/views/SideMenu/SideMenu.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

export const SIDE_MENU_ITEMS: IMenuItems = {
  employees: {
    text: 'employees',
    route: AppNavigationRoutes.EMPLOYEES,
    icon: PeopleAltIcon
  },
  projects: {
    text: 'projects',
    route: AppNavigationRoutes.PROJECTS,
    icon: FolderCopyIcon
  },
  CVs: {
    text: 'cvs',
    route: AppNavigationRoutes.CVS,
    icon: InsertDriveFileIcon
  },
  departments: {
    text: 'departments',
    route: AppNavigationRoutes.DEPARTMENTS,
    icon: Groups3Icon
  },
  positions: {
    text: 'positions',
    route: AppNavigationRoutes.POSITIONS,
    icon: FormatListNumberedRtlIcon
  },
  skills: {
    text: 'skills',
    route: AppNavigationRoutes.SKILLS,
    icon: ManageAccountsIcon
  },
  Languages: {
    text: 'Languages',
    route: AppNavigationRoutes.LANGUAGES,
    icon: TranslateIcon
  }
}
