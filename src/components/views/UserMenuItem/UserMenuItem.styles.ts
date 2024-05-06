import {
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled
} from '@mui/material'

export const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}))

export const ListItemText = styled(MuiListItemText)(() => ({
  paddingLeft: '8px'
}))
