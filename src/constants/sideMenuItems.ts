import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import Groups3Icon from '@mui/icons-material/Groups3'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import TranslateIcon from '@mui/icons-material/Translate'

import { ISideMenuItems } from '../components/views/SideMenu/SideMenu.interfaces'


export const SIDE_MENU_ITEMS: ISideMenuItems = {
  employees: {
    text: 'Employees',
    icon: PeopleAltIcon
    
  },
  projects: {
    text: 'Projects',
    icon: FolderCopyIcon
  },
  CVs: {
    text: 'CVs',
    icon: InsertDriveFileIcon
  },
  departments: {
    text: 'Departments',
    icon: Groups3Icon
  },
  positions: {
    text: 'Positions',
    icon: FormatListNumberedRtlIcon
  },
  skills: {
    text: 'Skills',
    icon: ManageAccountsIcon
  },
  Languages: {
    text: 'Languages',
    icon: TranslateIcon
  }
}
