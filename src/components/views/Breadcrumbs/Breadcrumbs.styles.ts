import { NavLink } from 'react-router-dom'
import { Box, styled } from '@mui/material'

export const BreadcrumbsLink = styled(NavLink)({
  display: 'flex',
  alignItems: 'center',
  justifyContent:'space-between',
  textDecoration: 'none',
  color: 'inherit',
  '&:active': {
    color: 'red'
  }
})

export const StartCrumb = styled(Box)({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent:'space-between',
  textDecoration: 'none',
  color: 'inherit',
  '&:active': {
    color: 'red'
  }
})
