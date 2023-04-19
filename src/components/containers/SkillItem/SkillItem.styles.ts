import { Box, styled } from '@mui/material'

import { IBadgeStyled } from './SkillItem.interfaces'

export const SkillItemContainer = styled(Box)(() => ({
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  gridColumnGap: '20px',
  justifyContent: 'space-between'
}))

export const SkillBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '20px',
  color: theme.palette.secondary.main,
  minWidth: '250px'
}))

export const MasteryBox = styled(Box)<IBadgeStyled>(({ mastery_color }) => ({
  backgroundColor: mastery_color,
  color: '#fff',
  borderRadius: '16px',
  padding: '5px 14px'
}))
