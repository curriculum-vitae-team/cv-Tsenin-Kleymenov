import { Box, styled } from '@mui/material'

import { IBadgeStyled } from './SkillItem.interfaces'

export const SkillItemContainer = styled(Box)(() => ({
  margin: '5px',
  display: 'inline-flex',
  alignItems: 'center'
}))

export const SkillBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '20px',
  color: 'white',
  padding: '5px',
  backgroundColor: theme.palette.secondary.main
}))

export const MasteryBox = styled(Box)<IBadgeStyled>(({ theme, mastery_color }) => ({
  backgroundColor: mastery_color,
  color: theme.palette.secondary.main,
  borderRadius: '15px',
  padding: '5px',
  marginLeft: '5px'
}))
