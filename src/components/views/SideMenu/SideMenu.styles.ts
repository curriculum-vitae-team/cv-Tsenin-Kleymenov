import { styled } from '@mui/material'
import { IconButton } from '@mui/material'

export const Sidebar = styled('div')({
  position: 'relative',
  minWidth: '300px',
  backgroundColor: '#fff'
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
