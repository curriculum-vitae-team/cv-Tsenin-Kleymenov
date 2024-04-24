import {
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled
} from '@mui/material'

import { IListItemTextProps } from './SideMenuItem.interfaces'

export const ListItemText = styled(MuiListItemText)<IListItemTextProps>`
  color: ${({ isActive, theme }) =>
    isActive ? `${theme.palette.primary.main}` : `${theme.palette.text.primary}`};
`

export const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}))
