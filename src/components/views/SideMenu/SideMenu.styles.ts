import { Box, styled } from '@mui/material'
import { IconButton } from '@mui/material'

export const AppSideMenu = styled(Box)({
  width: '250px',
  display: 'flex',
  flexDirection: 'column'
})

export const SideMenuCloseButton = styled(IconButton)({
  alignSelf: 'flex-end',
  margin: '5px',
  padding: '10px'
})

export const SideMenuBurgerButton = styled(IconButton)({
  margin: '0',
  padding: '0'
})
