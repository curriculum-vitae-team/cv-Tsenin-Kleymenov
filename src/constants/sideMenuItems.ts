import FolderCopyIcon from '@/mui/icons-material/FolderCopy'
import FormatListNumberedRtlIcon from '@/mui/icons-material/FormatListNumberedRtl'
import Groups3Icon from '@/mui/icons-material/Groups3'
import InsertDriveFileIcon from '@/mui/icons-material/InsertDriveFile'
import ManageAccountsIcon from '@/mui/icons-material/ManageAccounts'
import PeopleAltIcon from '@/mui/icons-material/PeopleAlt'
import TranslateIcon from '@/mui/icons-material/Translate'

import { ISideMenuItems } from '../components/views/SideMenu/SideMenu.interfaces'

export const SIDE_MENU_ITEMS: ISideMenuItems = {
  employees: {
    text: 'Employees',
    route: '/employees',
    icon: PeopleAltIcon
  },
  projects: {
    text: 'Projects',
    route: '/projects',
    icon: FolderCopyIcon
  },
  CVs: {
    text: 'CVs',
    route: '/cvs',
    icon: InsertDriveFileIcon
  },
  departments: {
    text: 'Departments',
    route: '/departments',
    icon: Groups3Icon
  },
  positions: {
    text: 'Positions',
    route: '/positions',
    icon: FormatListNumberedRtlIcon
  },
  skills: {
    text: 'Skills',
    route: '/skills',
    icon: ManageAccountsIcon
  },
  Languages: {
    text: 'Languages',
    route: '/languages',
    icon: TranslateIcon
  }
}
