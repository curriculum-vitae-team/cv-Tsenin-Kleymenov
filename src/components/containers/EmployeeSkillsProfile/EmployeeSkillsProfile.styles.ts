import { Badge as MUIBadge, styled } from '@mui/material'

import { Button } from '@/components/views/Button/Button'

export interface IBadgeStyled {
  mastery?: string
}

export const Badge = styled(MUIBadge)<IBadgeStyled>(({ theme, mastery }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: mastery,
    color: theme.palette.secondary.main
  }
}))

export const AddAction = styled(Button)(() => ({
  whiteSpace: 'nowrap',
  maxWidth: 170,
  alignSelf: 'flex-end',
  padding: '8px 16px',
  margin: 0
}))
