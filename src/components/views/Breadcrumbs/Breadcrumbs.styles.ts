import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material'

export const BreadcrumbsLink = styled(NavLink)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: 'none',
  fontSize: color === 'info' ? '1.1rem' : '1rem',
  color: color === 'info' ? theme.palette.text.primary : theme.palette.info.main,
  position: 'relative'
}))

export const UserBreadcrumbText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  opacity: 1,
  display: 'flex',
  alignItems: 'center'
}))
