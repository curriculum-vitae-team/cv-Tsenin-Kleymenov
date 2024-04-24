import { ListItemIcon as MuiListItemIcon, styled } from '@mui/material'

export const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}))
