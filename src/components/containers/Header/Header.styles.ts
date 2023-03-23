import { AppBar, styled } from '@mui/material'

export const HeaderWrapper = styled(AppBar)(() => ({
  position: 'relative'
}))

export const HeaderTabsWrapper = styled('div')(() => ({
  position: 'absolute',
  left: '50%',
  bottom: 0,
  transform: 'translate(-50%, 0)'
}))

export const HeaderAuthWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}))
