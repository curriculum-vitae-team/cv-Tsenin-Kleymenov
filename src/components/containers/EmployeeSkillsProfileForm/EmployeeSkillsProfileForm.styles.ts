import { Badge as MUIBadge, styled } from '@mui/material'

export interface IBadgeStyled {
  mastery?: string
}

export const Badge = styled(MUIBadge)<IBadgeStyled>(({ theme, mastery }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: mastery,
    color: theme.palette.secondary.main
  }
}))

