import { Box, Card, IconButton, styled, Typography } from '@mui/material'

import { IBadgeStyled } from './LanguageItem.interfaces'

export const LanguageCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  height: 'fit-content',
  alignItems: 'center',
  color: theme.palette.info.main,
  margin: 0,
  borderRadius: '5px',
  justifyContent: 'space-between',
  padding: '16px',
  backgroundColor: '#f5f5f7',
  boxShadow: 'none'
}))

export const LanguageItemContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridAutoFlow: 'column',
  textTransform: 'initial',
  gridGap: '30px',
  width: 'fit-content'
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
