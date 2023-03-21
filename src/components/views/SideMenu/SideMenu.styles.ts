import { styled } from '@mui/material'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'

export const SideMenu = styled(Box)({
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
  margin: '5px',
  padding: '10px'
})


