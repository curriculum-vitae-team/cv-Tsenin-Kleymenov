import { Box, IconButton, styled, Typography } from '@mui/material'

import { Button } from '@/components/views/Button/Button'

import { IBadgeStyled } from './LanguageItem.interfaces'

export const LanguageButton = styled(Button)(({ theme }) => ({
  color: theme.palette.info.main,
  margin: 0,
  borderRadius: 0,
  justifyContent: 'start',
  padding: '8px 16px'
}))

export const LanguageItemContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridAutoFlow: 'column',
  textTransform: 'initial',
  gridGap: '30px'
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'flex-start',
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  marginLeft: '16px'
}))

export const ProficiencyBadge = styled(Typography)<IBadgeStyled>(({ proficiency_color }) => ({
  color: proficiency_color
}))
