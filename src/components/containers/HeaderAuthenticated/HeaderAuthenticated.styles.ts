import { AppBar, styled } from '@mui/material'

export const HeaderMenuWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100%'
}))

export const Header = styled(AppBar)(() => ({
  position: 'relative',
  boxShadow: 'none'
}))
