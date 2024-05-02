import {
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled
} from '@mui/material'

import { IListItemProps, IListItemTextProps } from './SideMenuItem.interfaces'

export const ListItem = styled(MuiListItem)<IListItemProps>`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: ${({ isActive, theme }) =>
      isActive ? `${theme.palette.primary.main}` : 'transparent'};
  }
`

export const ListItemText = styled(MuiListItemText)<IListItemTextProps>`
  color: ${({ isActive, theme }) =>
    isActive ? `${theme.palette.primary.main}` : `${theme.palette.text.primary}`};
`

export const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}))
